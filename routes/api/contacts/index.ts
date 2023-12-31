import { type Handlers } from "$fresh/server.ts";
import { assertSignedIn, State } from "@/middleware/session.ts";
import { getCursor } from "@/utils/http.ts";
import { loadContactList, writeContact } from "@/services/db/contact.ts";
import { ulid } from "std/ulid/mod.ts";
import { deleteContact } from "@/services/db/contact.ts";

export const handler: Handlers<undefined, State> = {
  async GET(req, ctx) {
    const { login } = ctx.state.sessionUser!;
    const url = new URL(req.url);
    const response = await loadContactList(login, {
      cursor: getCursor(url),
      reverse: false,
      consistency: "strong",
    });

    return Response.json({
      values: [...response.contacts],
      cursor: response.cursor,
    });
  },
  async POST(req, ctx) {
    // console.log("I'm in: POST /api/contacts")
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
    const lastConnection = form.get("lastConnection")
      ? form.get("lastConnection")
      : "";
    const nextConnection = form.get("nextConnection")
      ? form.get("nextConnection")
      : "";

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
      lastConnection,
      nextConnection,
    };

    // console.log("about to write contact: ", contact)

    try {
      await writeContact(login, contact);
      // TODO: Do server-side redirect to /contacts
      return new Response(null, { status: 200 });
    } catch (err) {
      // Error handling for failed write
      console.error("Error writing contact: ", err);
    
      const errorMessage = "An error occurred while writing the contact.";
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  },
  async DELETE(req, ctx) {
    assertSignedIn(ctx);
    const { login } = ctx.state.sessionUser!;
    const { deleteIds } = await req.json();
    for (const id of deleteIds) {
      await deleteContact(login, id);
    }

    // TODO: Do server side redirect to /contacts
    return new Response(null, { status: 200 });
  },
};
