import Head from "@/components/Head.tsx";
import SiteHeader from "@/components/SiteHeader.tsx";
import SiteFooter from "@/components/SiteFooter.tsx";
import { ComponentChildren } from "preact";
import { PageState } from "@/islands/PageState.tsx";

interface PageProps {
  title?: string;
  children?: ComponentChildren;
  loggedIn?: boolean;
}

export function Page(props: PageProps) {
  const { loggedIn, title, children } = props;

  return (
    <>
      <PageState>
        <div class="container mx-auto px-4">
          <Head title={title}>
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
          <SiteHeader loggedIn={loggedIn} />
          <div class="px-6">{children}</div>
          <SiteFooter />
        </div>
      </PageState>
    </>
  );
}
