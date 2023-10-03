// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import {
  LINK_STYLES,
  NAV_STYLES,
  SITE_BAR_STYLES,
  SITE_NAME,
} from "@/utils/constants.ts";
import IconBrandGithub from "tabler_icons_tsx/brand-github.tsx";
import MadeWithFreshBadge from "@/components/MadeWithFreshBadge.tsx";

export default function Footer(props: { url: URL }) {
  return (
    <footer class={`${SITE_BAR_STYLES} flex-col md:flex-row mt-8`}>
      <p>
        © {new Date().getFullYear()} {SITE_NAME} by <a href="https://megan.chantosa.com">Megan Chantosa</a>
      </p>
      <nav class={NAV_STYLES}>
        {
          /* <a
          href="/blog"
          class={props.url.pathname === "/blog"
            ? ACTIVE_LINK_STYLES
            : LINK_STYLES}
        >
          Blog
        </a> */
        }
        {
          /* <a href="/feed" aria-label="Deno Hunt RSS Feed" class={LINK_STYLES}>
          <IconRss class="h-6 w-6" />
        </a>
        <a
          href="https://discord.gg/deno"
          target="_blank"
          aria-label="Deno SaaSKit on Discord"
          class={LINK_STYLES}
        >
          <IconBrandDiscord class="h-6 w-6" />
        </a> */
        }
        <a
          href="https://github.com/mchantosa/smooth-kitty"
          target="_blank"
          aria-label="Connections on GitHub"
          class={LINK_STYLES}
        >
          <IconBrandGithub class="h-6 w-6" />
        </a>
        <a href="https://fresh.deno.dev">
          <MadeWithFreshBadge />
        </a>
      </nav>
    </footer>
  );
}
