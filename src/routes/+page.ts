import client from "$lib/api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const stats = await client.GET("/stats", { fetch });

	return {
		serverStats: {
			data: stats.data,
			error: stats.error,
		},
	};
};
