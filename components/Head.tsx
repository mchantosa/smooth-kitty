// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { Head as _Head } from "$fresh/runtime.ts";
import Meta, { type MetaProps } from "./Meta.tsx";
import { SITE_DESCRIPTION, SITE_NAME } from "@/utils/constants.ts";
import { ComponentChildren } from "preact";

/**
 * This acts as a wrapper around Fresh's `<Head />`.
 * It includes HTML metadata from the `<Meta />` with defaults specifically for Deno Hunt.
 */
export default function Head(
  props:
    & Partial<Omit<MetaProps, "href">>
    & Pick<MetaProps, "href">
    & {
      children?: ComponentChildren;
    },
) {
  return (
    <_Head>
      <Meta
        title={props?.title ? `${props.title} ▲ ${SITE_NAME}` : SITE_NAME}
        description={props?.description ?? SITE_DESCRIPTION}
        href={props.href}
      />
      <link
        href="https://cdn.jsdelivr.net/npm/daisyui@3.7.3/dist/full.css"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
        rel="stylesheet"
      />
      {props.children}
    </_Head>
  );
}
