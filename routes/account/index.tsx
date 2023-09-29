// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { RouteContext } from "$fresh/server.ts";
import type { SignedInState } from "@/middleware/session.ts";
import { BUTTON_STYLES } from "@/utils/constants.ts";
import Head from "@/components/Head.tsx";
import { GithubProfile } from "@/components/GithubProfile.tsx";
import { GoogleProfile } from "@/components/GoogleProfile.tsx";
import { FacebookProfile } from "@/components/FacebookProfile.tsx";

// deno-lint-ignore require-await
export default async function AccountPage(
  _req: Request,
  ctx: RouteContext<undefined, SignedInState>,
) {
  const { sessionUser } = ctx.state;

  return (
    <>
      <Head title="Account" href={ctx.url.href} />
      <main class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
        {sessionUser.provider === "github" && (
          <GithubProfile sessionUser={sessionUser}></GithubProfile>
        )}
        {sessionUser.provider === "google" && (
          <GoogleProfile sessionUser={sessionUser}></GoogleProfile>
        )}
        {sessionUser.provider === "facebook" && (
          <FacebookProfile sessionUser={sessionUser}></FacebookProfile>
        )}
        <a
          href="/signout?success_url=/"
          class={`${BUTTON_STYLES} block text-center mt-8`}
        >
          Sign out
        </a>
      </main>
    </>
  );
}
