import Head from "@/components/Head.tsx";
import SiteHeader from "@/components/SiteHeader.tsx";
import SiteFooter from "@/components/SiteFooter.tsx";
import { ComponentChildren } from "preact";

interface PageProps {
  title?: string;
  children?: ComponentChildren;
  loggedIn?: boolean;
}

export function Page(props: PageProps) {
  return (
    <div class="container mx-auto px-4">
      <Head title={props.title}>
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
        <script
          src="https://kit.fontawesome.com/c0ddffff3b.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <SiteHeader loggedIn={props.loggedIn} />
      <div class="px-6">{props.children}</div>
      <SiteFooter />
    </div>
  );
}
