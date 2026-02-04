import { fromOpenApi } from "@msw/source/open-api";
import spec from "./api-1.json";
import type { OpenAPI } from "openapi-types";

export const handlers = await fromOpenApi(spec as OpenAPI.Document);
