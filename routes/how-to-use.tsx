// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { RouteContext } from "$fresh/server.ts";
import type { SignedInState } from "@/middleware/session.ts";
import Head from "@/components/Head.tsx";

// deno-lint-ignore require-await
export default async function Welcome(
  _req: Request,
  ctx: RouteContext<undefined, SignedInState>,
) {
  return (
    <>
      <Head title="Welcome" href={ctx.url.href} />
      <main class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
        Welcome!
      </main>
    </>
  );
}
