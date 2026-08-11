import client from "$lib/api/index.ts";
import type { PageLoad } from "./$types.d.ts";

export const load: PageLoad = async ({ fetch }) => {
	const stats = await client.GET("/stats", { fetch });

	return {
		serverStats: {
			data: stats.data,
			error: stats.error,
		},
	};
};
