import { error } from '@sveltejs/kit';

//TODO: Populate this with the rest of the user info.
export interface UserInfo {
	username: string;
}

export const apiBaseURL = new URL('http://localhost:5000/api'); //TODO: Move into config/env vars?
export enum RestMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE'
}
type JSONData = string;
type AuthToken = string;

export const call = async <T>(
	method: RestMethods,
	path: string,
	body?: JSONData,
	token?: AuthToken
): Promise<T> => {
	const headers = new Headers([['Content-Type', 'application/json']]);
	if (token) {
		headers.set('Authorization', `Token ${token}`);
	}

	const reqData: RequestInit = {
		...(!(method === RestMethods.GET) ? { body } : {}),
		method,
		headers
	};

	// need to update the path to include the "/api" at the front of the pathname
	// otherwise, "api" gets chopped off the request
	path = `${apiBaseURL.pathname}/${path}`;

	const fullPath = new URL(path, apiBaseURL);
	return await fetch(fullPath, reqData)
		.then(async (response) => {
			const text = await response.text();

			return text ? JSON.parse(text) : {};
		})
		.catch((err) => {
			throw error(err);
		});
};
