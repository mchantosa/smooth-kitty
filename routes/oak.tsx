// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import { Page } from "@/components/Page.tsx";
import { ItemsContainer } from "@/islands/ItemsContainer.tsx";

export default function OakPage(props: PageProps) {
  return (
    <>
      <Head title="Oak" href={props.url.href} />
      <Page title="Oak">
        <ItemsContainer></ItemsContainer>
      </Page>
    </>
  );
}
