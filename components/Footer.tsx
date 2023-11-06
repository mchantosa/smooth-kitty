// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import {
  LINK_STYLES,
  NAV_STYLES,
  SITE_BAR_STYLES,
  SITE_BAR_STYLES2,
  SITE_NAME,
} from "@/utils/constants.ts";
import IconBrandGithub from "tabler_icons_tsx/brand-github.tsx";
import MadeWithFreshBadge from "@/components/MadeWithFreshBadge.tsx";

export default function Footer(props: { url: URL }) {
  return (
    // <footer class={`${SITE_BAR_STYLES} flex-col md:flex-row mt-8`}>
    <>
      <footer
        className={`footer ${SITE_BAR_STYLES2} p-10 text-base-content`}
      >
        <nav>
          <header className="footer-title">Company</header>
          <a
            href="/"
            className="link link-hover"
          >
            About
          </a>
          <a
            href="/how-to-use"
            className="link link-hover"
          >
            How to use
          </a>
          <a
            href="/coming-soon"
            className="link link-hover"
          >
            Coming soon
          </a>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <a
            href="/privacy"
            className="link link-hover"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-and-conditions"
            className="link link-hover"
          >
            Terms and Conditions
          </a>
        </nav>
      </footer>

      <footer className={`${SITE_BAR_STYLES} flex-col md:flex-row mt-8`}>
        <p>
          © {new Date().getFullYear()} {SITE_NAME} by{" "}
          <a
            href="https://megan.chantosa.com"
            className="text-blue-500 hover:underline"
          >
            Megan Chantosa
          </a>
        </p>
        <nav class={NAV_STYLES}>
          <a
            href="https://github.com/mchantosa/smooth-kitty"
            target="_blank"
            aria-label="Connections on GitHub"
            class={LINK_STYLES}
          >
            <IconBrandGithub className="h-6 w-6" />
          </a>
          <a
            href="https://fresh.deno.dev"
            class="border-2 rounded-lg border-white dark:border-black hover:(border-gray-500)"
          >
            <MadeWithFreshBadge />
          </a>
        </nav>
      </footer>
    </>
  );
}
