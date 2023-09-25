import { type Handlers } from "$fresh/server.ts";
import { assertSignedIn, State } from "@/middleware/session.ts";

import { deleteContact } from "@/services/db/contact.ts";

export const handler: Handlers<undefined, State> = {
  async DELETE(_req, ctx) {
    assertSignedIn(ctx);
    const { login } = ctx.state.sessionUser!;
    await deleteContact(login, ctx.params.id);

    // TODO: Do server side redirect to /contacts
    return new Response(null, { status: 200 });
  },
};
