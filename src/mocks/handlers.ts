import { fromOpenApi } from "@msw/source/open-api";
import spec from "./api-1.json";

export const handlers = await fromOpenApi(spec.toString());
console.log(await fromOpenApi(spec.toString()));
console.log(handlers);
