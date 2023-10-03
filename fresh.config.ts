// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";
import kvOAuthPlugin from "./plugins/kv_oauth.ts";
import protectedRoutes from "./plugins/protected_routes.ts";
import { FreshOptions } from "$fresh/server.ts";
import { Cron } from "https://deno.land/x/croner@7.0.2/dist/croner.js";

const EVERY_SUNDAY = "0 0 0 * * 7";

// See https://deno.land/x/croner@7.0.2
Cron(EVERY_SUNDAY, () => {
  // TODO: run a job
});

export default {
  plugins: [kvOAuthPlugin, protectedRoutes, twindPlugin(twindConfig)],
} as FreshOptions;
