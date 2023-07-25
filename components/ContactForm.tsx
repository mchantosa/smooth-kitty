// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { JSX } from "preact";
//import { SITE_NAME } from "@/utils/constants.ts";

export default function ContactForm(
  props: JSX.HTMLAttributes<HTMLImageElement>
) {
  //const height = props.height ?? 96;
  //const width = height;

  return (
    <>
      <form action="add_contact" method="post">
        <input
          placeholder="First Name"
          name="first_name"
          type="text"
          class="input input-bordered w-full max-w-xs"
        />
        <input
          placeholder="Last Name"
          name="last_name"
          type="text"
          class="input input-bordered w-full max-w-xs"
        />
        <input
          value="Save Contact"
          type="submit"
          class="btn btn-primary w-full"
        />
      </form>
    </>
  );
}
