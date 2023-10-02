import { type Handlers } from "$fresh/server.ts";
import { State } from "@/middleware/session.ts";
import { resetDb, seedContacts } from "@/services/db/contact.ts";
import { redirect } from "@/utils/http.ts";
import { Status } from "std/http/http_status.ts";

export const handler: Handlers<undefined, State> = {
  async GET(req, ctx) {
    const { login } = ctx.state.sessionUser!;
    await resetDb();
    await seedContacts(login, 10);
    return redirect("/contacts", Status.SeeOther);
  },
};
