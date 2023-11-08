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
        href="https://cdn.jsdelivr.net/npm/daisyui@3.9.4/dist/full.css"
        rel="stylesheet"
        type="text/css"
      />

      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      </link>

      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Open+Sans&display=swap"
        rel="stylesheet"
      >
      </link>
      {props.children}
    </_Head>
  );
}
