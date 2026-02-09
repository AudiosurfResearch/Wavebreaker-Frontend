import { fromOpenApi } from "@msw/source/open-api";
import type { OpenAPI } from "openapi-types";
import spec from "$lib/api/api-1.json";

export const handlers = await fromOpenApi(spec as OpenAPI.Document);
