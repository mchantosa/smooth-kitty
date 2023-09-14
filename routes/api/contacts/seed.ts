import { type Handlers } from "$fresh/server.ts";
import { State } from "@/middleware/session.ts";

export const handler: Handlers<undefined, State> = {
  async GET(req) {
    await import("@/tasks/contacts/reset.ts");
    await import("@/tasks/contacts/seed.ts");
    return Response.json({
      reset: true,
    });
  },
};
