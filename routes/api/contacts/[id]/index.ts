import { type Handlers } from "$fresh/server.ts";
import { assertSignedIn, State } from "@/middleware/session.ts";
import { getCursor } from "@/utils/http.ts";
import { deleteContact } from "@/services/db/contact.ts";
// import { errors } from "std/http/http_errors.ts";
import { ulid } from "std/ulid/mod.ts";
import type { InputSchema } from "@/shared/data/contact.ts";

export const handler: Handlers<undefined, State> = {
  async DELETE(req, ctx) {
    assertSignedIn(ctx);
    const { login } = ctx.state.sessionUser!;

    //await deleteContact(login, contacts);
    console.log(`deleting contact: ${ctx.params.id}...`);
    await deleteContact(login, ctx.params.id);

    // TODO: Do server side redirect to /contacts
    return new Response(null, { status: 200 });
  },
};
