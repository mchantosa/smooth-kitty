import { JSX } from "preact";
import { Head } from "$fresh/runtime.ts";
import SiteHeader from "@/components/SiteHeader.tsx";
import SiteFooter from "@/components/SiteFooter.tsx";

export function Page(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div class="container mx-auto px-4">
      <Head>
        <title>{props.title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={""}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="styles/tailwind.css" />
      </Head>
      <SiteHeader active="/" />
      <div class="py-6 px-8" style={{ minHeight: 600 }}>
        {props.children}
      </div>
      <SiteFooter>
        <div class="text-gray-500 space-y-2"></div>
      </SiteFooter>
    </div>
  );
}
