import { createOpenApiHttp } from "openapi-msw";
import { dev } from "$app/environment";
import type { paths } from "$lib/api/v1";

// TODO: use env var to set base URL for non-dev environment
const http = createOpenApiHttp<paths>({
	baseUrl: dev ? "http://localhost:5173/api" : "",
});

// TS only suggests available GET paths
const statsHandler = http.get("/stats", ({ response }) => {
	return response(200).json({
		scoreCount: 13649,
		searchSupported: true,
		songCount: 15122,
		userCount: 150,
	});
});

export const handlers = [statsHandler];
