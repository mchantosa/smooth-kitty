// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Logo from "@/components/Logo.tsx";
import { NOTICE_STYLES } from "@/utils/constants.ts";
import type { Handlers } from "$fresh/server.ts";
import { REDIRECT_PATH_AFTER_LOGIN } from "@/utils/constants.ts";
import type { State } from "./_middleware.ts";
import { redirect } from "@/utils/http.ts";
import { Page } from "@/components/Page.tsx";

// deno-lint-ignore no-explicit-any
export const handler: Handlers<any, State> = {
  async POST(req, ctx) {
    const form = await req.formData();
    const displayName = form.get("display_name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const { data, error } = await ctx.state.supabaseClient.auth.signUp({
      email,
      password,
    });

    if (error) {
      return redirect(`/signup?error=${encodeURIComponent(error.message)}`);
    }

    const redirectUrl =
      new URL(req.url).searchParams.get("redirect_url") ??
      REDIRECT_PATH_AFTER_LOGIN;

    return redirect(redirectUrl);
  },
};

/**
 * If an error message isn't one of these possible error messages, the error message is not displayed.
 * This is done to avoid phishing attacks.
 * E.g. if the `error` parameter's value is "Authentication error: please send your password to mrscammer@shady.com".
 */
const POSSIBLE_ERROR_MESSAGES = new Set([
  "User already registered",
  "Password should be at least 6 characters",
  "To signup, please provide your email",
  "Signup requires a valid password",
]);

export default function SignupPage(props: PageProps) {
  const errorMessage = props.url.searchParams.get("error");

  return (
    <>
      <Head title="Signup" href={props.url.href} />
      <Page title="Signup">
        <div class="max-w-xs flex h-screen m-auto">
          <div class="m-auto w-72">
            <a href="/">
              <Logo class="mb-8" />
            </a>
            {errorMessage && POSSIBLE_ERROR_MESSAGES.has(errorMessage) && (
              <div class={`${NOTICE_STYLES} mb-4`}>{errorMessage}</div>
            )}
            <form method="POST" class="space-y-4">
              <input
                placeholder="Display name"
                name="display_name"
                type="text"
                required
                class="input input-bordered w-full max-w-xs"
              />
              <input
                placeholder="Email"
                name="email"
                type="email"
                required
                class="input input-bordered w-full max-w-xs"
              />
              <input
                placeholder="Password"
                name="password"
                type="password"
                required
                class="input input-bordered w-full max-w-xs"
              />
              <button type="submit" class="btn btn-primary w-full">
                Signup
              </button>
            </form>
            <hr class="my-4" />
            <div class="text-center text-gray-500 hover:text-black mt-8">
              <a href="/login">Already have an account? Log in</a>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}
