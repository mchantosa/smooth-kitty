// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import {
  ACTIVE_LINK_STYLES,
  LINK_STYLES,
  SITE_BAR_STYLES,
} from "@/utils/constants.ts";
import IconX from "tabler_icons_tsx/x.tsx";
import IconUserCircle from "tabler_icons_tsx/user-circle.tsx";
import IconMenu from "tabler_icons_tsx/menu-2.tsx";
import { cx } from "@twind/core";
import { User } from "@/utils/db.ts";

export default function Header(props: {
  sessionUser?: User;
  hasNotifications: boolean;
  url: URL;
}) {
  const { sessionUser, url } = props;
  const NAV_ITEM = "text-gray-500 px-3 py-4 sm:py-2";
  return (
    <header>
      <div class={cx(SITE_BAR_STYLES, "flex-col sm:flex-row")}>
        <input
          type="checkbox"
          id="nav-toggle"
          class="hidden [:checked&+*>:last-child>*>:first-child]:hidden [:checked&+*>:last-child>*>:last-child]:block checked:siblings:last-child:flex"
        />

        <div class="flex justify-between items-center">
          <a href="/" class="shrink-0">
            <h1 class="text-3xl font-bold">InnerCircle</h1>
          </a>
          <div class="flex gap-4 items-center">
            <label
              tabIndex={0}
              class="sm:hidden"
              id="nav-toggle-label"
              htmlFor="nav-toggle"
            >
              <IconMenu class="w-6 h-6" />
              <IconX class="hidden w-6 h-6" />
            </label>
          </div>
        </div>
        <script>
          {`
          const navToggleLabel = document.getElementById('nav-toggle-label');
          navToggleLabel.addEventListener('keydown', () => {
            if (event.code === 'Space' || event.code === 'Enter') {
              navToggleLabel.click();
              event.preventDefault();
            }
          });
        `}
        </script>
        <nav
          class={"hidden flex-col gap-x-4 divide-y divide-solid sm:(flex items-center flex-row divide-y-0)"}
        >
          {sessionUser
            ? (
              <>
                <a href="/dashboard" class={cx(LINK_STYLES, NAV_ITEM)}>
                  Dashboard
                </a>
                <a href="/contacts" class={cx(LINK_STYLES, NAV_ITEM)}>
                  Contacts
                </a>
                <a
                  href="/account"
                  class={cx(
                    url.pathname === "/account"
                      ? ACTIVE_LINK_STYLES
                      : LINK_STYLES,
                    NAV_ITEM,
                  )}
                >
                  <div class="flex">
                    <img
                      src={sessionUser?.profilePictureUrl}
                      class="w-6 mr-2 rounded rounded-full"
                    />
                    Account
                  </div>
                </a>
              </>
            )
            : (
              <a href="/login" class={cx(LINK_STYLES, NAV_ITEM)}>
                Sign in
              </a>
            )}
        </nav>
      </div>
    </header>
  );
}
