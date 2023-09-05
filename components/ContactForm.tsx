// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { useState } from "preact/hooks";
import { JSX } from "preact";

//import { SITE_NAME } from "@/utils/constants.ts";

export default function ContactForm(props: any) {
  const { contact, method, action } = props;

  return (
    <>
      <form action={action} method={method}>
        <input
          name="id"
          type="text"
          class="hidden"
          value={contact ? contact.id : ""}
        />
        <input
          placeholder="First Name"
          name="first_name"
          type="text"
          class="input input-bordered w-full max-w-xs"
          value={contact ? contact.first_name : ""}
        />
        <input
          placeholder="Last Name"
          name="last_name"
          type="text"
          class="input input-bordered w-full max-w-xs"
          value={contact ? contact.last_name : ""}
        />
        <input
          placeholder="Email"
          name="email"
          type="email"
          class="input input-bordered w-full max-w-xs"
          value={contact ? contact.email : ""}
        />
        <input
          placeholder="Period"
          name="period"
          type="period"
          class="input input-bordered w-full max-w-xs"
          value={contact ? contact.email : ""}
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
