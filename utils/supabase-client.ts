import { createServerSupabaseClient } from "@supabase/auth-helpers-shared";
import { getCookies, setCookie } from "$std/http/cookie.ts";
import { Database } from "@/types/supabase.ts";

export type SupabaseClient = ReturnType<typeof createSupabaseClient>;

export function createSupabaseClient(
  requestHeaders: Headers,
  responseHeaders: Headers
) {
  return createServerSupabaseClient<Database>({
    supabaseUrl: Deno.env.get("SUPABASE_API_URL")!,
    supabaseKey: Deno.env.get("SUPABASE_ANON_KEY")!,
    getRequestHeader: (key) => requestHeaders.get(key) ?? undefined,
    getCookie: (name) => {
      const cookie = getCookies(requestHeaders)[name];
      return cookie ? decodeURIComponent(cookie) : undefined;
    },
    setCookie: (name, value, options) =>
      setCookie(responseHeaders, {
        name,
        value: encodeURIComponent(value),
        ...options,
        sameSite: "Lax",
        httpOnly: false,
      }),
  });
}
