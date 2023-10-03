// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { RouteContext } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Divider from "@/components/Divider.tsx";
import DashboardList from "@/islands/DashboardList.tsx";
import {
  getLastSundayOrTodayDatePretty,
  getNextSaturdayOrTodayDatePretty,
} from "@/utils/dates.ts";

export default async function DashbooardPage(_req: Request, ctx: RouteContext) {
  return (
    <>
      <Head title="Contacts" href={ctx.url.href} />
      <main class="p-4 flex-1">
        <div class="pl-4">
          <a href="/contacts/new" class="btn btn-primary">New contact</a>
        </div>
        <Divider
          textInsert={`${getLastSundayOrTodayDatePretty()} - ${getNextSaturdayOrTodayDatePretty()}`}
        />
        <DashboardList endpoint="/api/contacts" />
      </main>
    </>
  );
}
