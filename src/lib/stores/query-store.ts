//also blatantly stolen from ScoreSaber's frontend.
import { get, writable } from 'svelte/store';
import queryString from 'query-string';

import { goto } from '$app/navigation';
import { page } from '$app/stores';

export const queryChangeTimeout = writable(null);

export function pageQueryStore<T extends object>(props: T) {
	const queryStore = writable<Partial<T>>(props);
	let initialLoad = true;
	page.subscribe((p) => {
		const query = queryString.parse(p.url.searchParams.toString(), { parseNumbers: true });

		// set the default page to 1 after navigation if the query params do not contain the page parameter and the original props contained this field
		if ('page' in props && !query?.page) query.page = 1;

		const newParams: T = props;
		for (const key in query) {
			if (key in props) newParams[key] = query[key];
		}
		// for the first load keep initial prop values i.e. page = 1
		if (!initialLoad) {
			for (const key in props) {
				if (!(key in query)) newParams[key] = null;
			}
		}
		if (initialLoad) initialLoad = false;
		queryStore.set(newParams);
	});
	// removes null values from query string
	const queryFilter = (query: Partial<T>) => {
		return Object.keys(query)
			.filter((key) => query[key] !== null)
			.map((key) => {
				return { [key]: query[key] };
			})
			.reduce((a, b) => ({ ...a, ...b }), {});
	};
	return {
		subscribe: queryStore.subscribe,
		updateSingle: async (prop: keyof T, v: any): Promise<void> => {
			const query = get(queryStore);
			query[prop] = v;
			const urlSearchParams = new URLSearchParams(queryFilter(query));
			const g = `?${urlSearchParams.toString()}`;
			goto(g, { keepFocus: true, noScroll: true });
		},
		update: async (props: Partial<T>): Promise<void> => {
			const query = get(queryStore);
			Object.keys(props).forEach((p) => {
				query[p] = props[p];
			});
			const urlSearchParams = new URLSearchParams(queryFilter(query));
			const g = `?${urlSearchParams.toString()}`;
			goto(g, { keepFocus: true, noScroll: true });
		}
	};
}
