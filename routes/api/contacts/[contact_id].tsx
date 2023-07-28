import { HandlerContext, Handlers } from "$fresh/server.ts";
import { redirect } from "@/utils/http.ts";

export const handler: Handlers = {
  async DELETE(_req: Request, ctx: HandlerContext) {
    if (!ctx.state.session) {
      /** @todo Figure out `redirect_to` query */
      return redirect("/login");
    }
    const { contact_id } = ctx.params;
    console.log(`deleting ${contact_id}...`);

    const client: any = ctx.state.supabaseClient;
    const { error } = await client
      .from("contacts")
      .delete()
      .eq("id", contact_id);

    //const { error } = await client.from("test").delete().eq("id", contact_id);
    if (error) {
      console.error(`error: ${JSON.stringify(error)}`);
    }

    return new Response();
  },
};
