import { type Handlers } from "$fresh/server.ts";
import { assertSignedIn, State } from "@/middleware/session.ts";
import { getCursor } from "@/utils/http.ts";
import { loadContactList, writeContacts } from "@/services/db/contact.ts";
import { ulid } from "std/ulid/mod.ts";
import type { InputSchema } from "@/shared/data/contact.ts";

export const handler: Handlers<undefined, State> = {
  async GET(req, ctx) {
    const { login } = ctx.state.sessionUser!;
    const url = new URL(req.url);
    const response = await loadContactList(login, {
      cursor: getCursor(url),
      limit: 10,
      reverse: true,
      consistency: "strong",
    });

    return Response.json({
      values: [...response.contacts],
      cursor: response.cursor,
    });
  },
  async POST(req, ctx) {
    assertSignedIn(ctx);
    const { login } = ctx.state.sessionUser!;
    const form = await req.formData();
    const contactId = form.get("id");
    const firstName = form.get("firstName");
    const lastName = form.get("lastName");
    const pronouns = form.get("pronouns");
    const avatarUrl = form.get("avatarUrl");
    const phoneNumber = form.get("phoneNumber");
    const email = form.get("email");
    const preferredMethod = form.get("preferredMethod");
    const preferredMethodHandle = form.get("preferredMethodHandle");
    const period = form.get("period");
    const birthdayDay = form.get("birthdayDay");
    const birthdayMonth = form.get("birthdayMonth");
    const birthdayYear = form.get("birthdayYear");
    const connectOnBirthday = form.get("connectOnBirthday") === "true";

    // TODO: Validate contact data

    const contact = {
      id: contactId || ulid(),
      firstName,
      lastName,
      pronouns,
      avatarUrl,
      phoneNumber,
      email,
      preferredMethod,
      preferredMethodHandle,
      period,
      birthdayDay,
      birthdayMonth,
      birthdayYear,
      connectOnBirthday,
    };

    const contacts: InputSchema = [contact];
    await writeContacts(login, contacts);

    // TODO: Do server side redirect to /contacts
    return new Response(null, { status: 200 });
  },
};
