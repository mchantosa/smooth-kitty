import { type Handlers } from "$fresh/server.ts";
import { State } from "@/middleware/session.ts";
import { getCursor } from "@/utils/http.ts";
import { loadContactList } from "@/services/db/contact.ts";
import { LIST_ID } from "@/utils/constants.ts";

export const handler: Handlers<undefined, State> = {
  async GET(req) {
    const url = new URL(req.url);
    const response = await loadContactList(LIST_ID, {
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
};
