import type { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { SITE_DESCRIPTION, SITE_NAME } from "../utils/constants.ts";

interface HomeProps {
  siteName: string;
  siteDescription: string;
}

export const handler: Handlers<HomeProps> = {
  async GET(_req, ctx) {
    return ctx.render({
      siteName: SITE_NAME,
      siteDescription: SITE_DESCRIPTION,
    });
  },
};

export default function Home(props: PageProps<HomeProps>) {
  return (
    <>
      <Head>
        <title>{props.data.siteName}</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class="my-6">
          {props.data.siteDescription || "Welcome to your fresh site!"}
        </p>
      </div>
    </>
  );
}
