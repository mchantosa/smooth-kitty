// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { kv } from "@/utils/db.ts";
import { LIST_ID } from "@/utils/constants.ts";

console.log("Resetting database...");

const iter = kv.list({ prefix: ["list", LIST_ID] });
const promises = [];
for await (const res of iter) promises.push(kv.delete(res.key));
await Promise.all(promises);

console.log("Done...");
