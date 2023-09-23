// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { RouteContext } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Divider from "@/components/divider.tsx";
import DashboardList from "@/islands/DashboardList.tsx";
import DashboardUpcomingList from "@/islands/DashboardUpcomingList.tsx";

export default async function DashbooardPage(_req: Request, ctx: RouteContext) {
  return (
    <>
      <Head title="Contacts" href={ctx.url.href} />
      <main class="p-4 flex-1">
        <Divider textInsert="Last Sunday - Next Sunday" />
        <DashboardList endpoint="/api/contacts" />
        <Divider textInsert="Coming Up" />
        <DashboardUpcomingList endpoint="/api/contacts" />
      </main>
    </>
  );
}
