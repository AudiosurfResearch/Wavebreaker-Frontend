import { createOpenApiHttp } from "openapi-msw";
import type { paths } from "$lib/api/v1";

const http = createOpenApiHttp<paths>({ baseUrl: "/api" });

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
