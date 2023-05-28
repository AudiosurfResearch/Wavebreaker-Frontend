import { env } from '$env/dynamic/private';
import axios, { type AxiosRequestConfig } from 'axios';

export const apiBaseURL = env.API_URL;
export enum RestMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE'
}

//Taken from the ScoreSaber frontend and modified. Please don't smite me.
//https://github.com/ScoreSaber/ScoreSaber-Frontend/blob/main/src/lib/utils/fetcher.ts
export async function fetcher<T>(
	url: string,
	authToken?: string,
	config?: AxiosRequestConfig
): Promise<T> {
	const isAPI = url.startsWith('/api');

	if (isAPI) {
		url = `${apiBaseURL ?? ''}${url}`;
		config = { ...config };
		if (authToken) {
			config = { ...config, headers: { Authorization: `Bearer ${authToken}` } };
		}
	}

	const response = await axios.get<T>(url, config);
	return response.data;
}

export async function poster<T>(
	url: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	body: any,
	authToken?: string,
	config?: AxiosRequestConfig
): Promise<T> {
	const isAPI = url.startsWith('/api');

	if (isAPI) {
		url = `${apiBaseURL ?? ''}${url}`;
		config = { ...config };
		if (authToken) {
			config = { ...config, headers: { Authorization: `Bearer ${authToken}` } };
		}
	}

	const response = await axios.post<T>(url, body, config);
	return response.data;
}
