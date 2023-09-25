import { type Handlers } from "$fresh/server.ts";
import { assertSignedIn, State } from "@/middleware/session.ts";
import { errors } from "std/http/http_errors.ts";
import { deleteContact, loadContact } from "@/services/db/contact.ts";

export const handler: Handlers<undefined, State> = {
  async GET(_req, ctx) {
    assertSignedIn(ctx);
    const { login } = ctx.state.sessionUser!;
    const contact = await loadContact(login, ctx.params.id);

    if (contact === null) throw new errors.NotFound("Contact not found");
    return Response.json(contact);
  },
  async DELETE(_req, ctx) {
    assertSignedIn(ctx);
    const { login } = ctx.state.sessionUser!;
    await deleteContact(login, ctx.params.id);

    // TODO: Do server side redirect to /contacts
    return new Response(null, { status: 200 });
  },
};
