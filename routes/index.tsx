import type { Handlers, PageProps } from "$fresh/server.ts";
import { Page } from "@/components/Page.tsx";

interface IndexPageProps {}

export const handler: Handlers<IndexPageProps> = {
  async GET(_req, ctx) {
    return ctx.render();
  },
};

export default function IndexPage(props: PageProps<IndexPageProps>) {
  return (
    <>
      <Page title={"Connections"}>
        <article class="prose">
          <h3>Our Mission</h3>
          <p>
            To help you stay connected to those you truly care about. This is
            designed to be a medium agnostic, non-calendered, warm and user
            friendly, communication asset, intended to support a small to medium
            set of contacts.
          </p>
        </article>
      </Page>
    </>
  );
}
