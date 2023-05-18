import axios, { type AxiosRequestConfig } from 'axios';

export const apiBaseURL = 'http://wavebreakerdev.local'; //TODO: Move into config/env vars
export enum RestMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE'
}

//Taken from the ScoreSaber frontend. Please don't smite me.
//https://github.com/ScoreSaber/ScoreSaber-Frontend/blob/main/src/lib/utils/fetcher.ts
export async function fetcher<T>(url: string, authToken?: string, config?: AxiosRequestConfig): Promise<T> {
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