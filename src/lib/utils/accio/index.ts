import { onMount, onDestroy } from 'svelte';
import { get, writable } from 'svelte/store';
import axios from 'axios';

import { browser } from '$app/environment';

import { env } from '$env/dynamic/public';

type WavebreakerAPIError = {
	error: string;
};

import { DefaultCache, CacheItem } from './cache';
import { requestCancel } from './canceler';

export class Accio {
	useAccio<D>(key: string, options?: Partial<AccioOptions<D>>) {
		type E = AccioError;
		const unsubscribe: undefined | (() => void) = undefined;
		const data = writable<D | undefined>(undefined, () => () => unsubscribe?.());
		const error = writable<E | undefined>(undefined, () => () => unsubscribe?.());
		const loading = writable<boolean>(false);
		const initialLoadComplete = writable<boolean>(true);
		let curRequest: Promise<D> = undefined;

		onMount(async () => {
			await loadData(key);
		});

		const refresh = async (refreshOptions?: Partial<AccioRefreshOptions>) => {
			if (!get(initialLoadComplete) && !refreshOptions?.bypassInitialCheck)
				return console.warn('Refresh Canceled: Called before initial load');
			if (curRequest) return console.warn('Refresh Canceled: Request in progress');
			if (refreshOptions) {
				if (refreshOptions.newUrl) {
					key = refreshOptions.newUrl;
				}
				if (!refreshOptions.softRefresh) {
					data.set(null);
				}
				error.set(null);
			}

			await loadData(key, refreshOptions?.forceRevalidate, refreshOptions?.silent);
		};

		const loadData = async (key: string, forceRevalidate = false, silent = false) => {
			if (!silent) loading.set(true);
			try {
				let rawData = undefined;
				if (!forceRevalidate) {
					if (cache.has(key)) {
						const cachedData = cache.get(key);
						if (!cachedData.hasExpired()) {
							rawData = cache.get(key).data;
						}
					}
				}

				if (!rawData) {
					if (!curRequest) {
						curRequest = options.fetcher(key, {
							withCredentials:
								options.withCredentials !== undefined ? options.withCredentials : true,
							cancelToken: get(requestCancel).token
						});
					}
					rawData = await curRequest;
					if (rawData === "") rawData = null; //get bodged
					const expiry = new Date();
					expiry.setTime(expiry.getTime() + parseInt(env.PUBLIC_CACHE_EXPIRY_IN_MINUTES) * 60000);
					cache.set(key, new CacheItem({ data: rawData, expiresAt: expiry }));
				}
				data.set(rawData);
				if (options.onSuccess) {
					options.onSuccess(rawData);
				}
			} catch (ex) {
				if (axios.isCancel(ex)) {
					console.warn('Request cancelled:', ex.message);
					curRequest = undefined;
					loading.set(false);
					if (!get(initialLoadComplete)) initialLoadComplete.set(true);
					return;
				}
				if (axios.isAxiosError(ex)) {
					const wavebreakerError = ex.response.data as WavebreakerAPIError;
					if (wavebreakerError && wavebreakerError.error) {
						error.set(
							new AccioError(ex.name, wavebreakerError.error, ex.stack, ex.response.status)
						);
					} else {
						error.set(new AccioError(ex.name, 'Unknown', ex.stack, ex.response.status));
					}
				} else {
					error.set(new AccioError(ex.name, ex.message, ex.stack));
				}
				if (options.onError) {
					options.onError(ex);
				}
			}
			curRequest = undefined;
			if (!silent) loading.set(false);
			if (!get(initialLoadComplete)) initialLoadComplete.set(true);
		};

		if (browser) {
			const unsubFocus = subscribeFocus();
			const unsubOnline = subscribeOnline();
			const unsubVisibility = subscribeVisibilityChange();

			onDestroy(() => {
				unsubFocus();
				unsubOnline();
				unsubVisibility();
			});
		}

		let lastFocus: number | null = null;

		function subscribeFocus() {
			const focusHandler = () => {
				if (!options.ignoreSubscriptions) {
					const now = Date.now();
					if (lastFocus === null || now - lastFocus > 5000) {
						lastFocus = now;
						console.log(`Regained focus, refreshing ${key}`);
						refresh({ forceRevalidate: true, softRefresh: true, silent: true });
					}
				}
			};
			window.addEventListener('focus', focusHandler);
			return () => window.removeEventListener('focus', focusHandler);
		}

		function subscribeOnline() {
			const onlineHandler = () => {
				if (!options.ignoreSubscriptions) {
					console.log(`User is back online, refreshing ${key}`);
					refresh({ forceRevalidate: true, softRefresh: true, silent: true });
				}
			};
			window.addEventListener('online', onlineHandler);
			return () => window.removeEventListener('online', onlineHandler);
		}

		function subscribeVisibilityChange() {
			const visibilityChangeHandler = () => {
				if (document.visibilityState === 'visible') {
					if (!options.ignoreSubscriptions) {
						const now = Date.now();
						if (lastFocus === null || now - lastFocus > 5000) {
							lastFocus = now;
							console.log(`Regained focus, refreshing ${key}`);
							refresh({ forceRevalidate: true, softRefresh: true, silent: true });
						}
					}
				}
			};
			window.addEventListener('visibilitychange', visibilityChangeHandler);
			return () => window.removeEventListener('visibilitychange', visibilityChangeHandler);
		}

		onDestroy(() => unsubscribe?.());
		return { data, error, refresh, loading, initialLoadComplete };
	}
}
export interface OnSuccess {
	(data: any): void;
}

export interface OnError {
	(error: any): void;
}

export class AccioError {
	public name: string;
	public message: string;
	public stack?: string;
	public status?: number;

	constructor(name: string, message: string, stack?: string, status?: number) {
		this.name = name;
		this.message = message;
		this.stack = stack;
		this.status = status;
	}
}

export type AccioFetcher<D = any> = (...props: any[]) => Promise<D>;
export interface AccioOptions<D = any> {
	fetcher: AccioFetcher<D>;
	query: string;
	onSuccess: OnSuccess;
	onError: OnError;
	ignoreSubscriptions: boolean;
	withCredentials?: boolean;
}

export interface AccioRefreshOptions {
	newUrl?: string;
	softRefresh?: boolean;
	forceRevalidate?: boolean;
	bypassInitialCheck?: boolean;
	silent?: boolean;
}

const fetcher = <D>(url: string): Promise<D> => {
	return fetch(url).then((res) => {
		if (!res.ok) throw Error('Not a 2XX response.');
		return res.json();
	});
};

export const defaultOptions: AccioOptions = {
	fetcher,
	query: null,
	onSuccess: null,
	onError: null,
	ignoreSubscriptions: false,
	withCredentials: true
};

export const accio = new Accio();
const cache = new DefaultCache();

export const useAccio = <D>(key: string, options?: Partial<AccioOptions<D>>) => {
	return accio.useAccio<D>(key, options);
};
