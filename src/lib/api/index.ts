import createClient from "openapi-fetch";
import { dev } from "$app/environment";
import type { paths } from "./v1.d.ts";

// TODO: use env var to set base URL for non-dev environment
const client = createClient<paths>({
	baseUrl: dev ? "http://localhost:5173/api" : "",
});
export default client;
