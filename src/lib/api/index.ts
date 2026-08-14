import createClient from 'openapi-fetch';
import { dev } from '$app/environment';
import type { paths } from './v1';

// TODO: use env var to set base URL for non-dev environment
const client = createClient<paths>({
	baseUrl: dev ? 'https://wavebreaker.local/api' : '',
});
export default client;
