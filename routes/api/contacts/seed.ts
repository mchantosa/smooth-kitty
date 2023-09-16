import { type Handlers } from "$fresh/server.ts";
import { State } from "@/middleware/session.ts";
import { resetContacts, seedContacts } from "@/services/db/contact.ts";

export const handler: Handlers<undefined, State> = {
  async GET(req, ctx) {
    const { login } = ctx.state.sessionUser!;
    await resetContacts(login);
    await seedContacts(login, 50);
    return Response.json({
      reset: true,
    });
  },
};
