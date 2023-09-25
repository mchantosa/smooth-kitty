import { useSignal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
import type { Contact } from "@/shared/data/contact.ts";
import { LINK_STYLES } from "@/utils/constants.ts";
import IconInfo from "tabler_icons_tsx/info-circle.tsx";
import { fetchValues } from "@/utils/islands.ts";

export default function Divider(props: { textInsert?: string }) {
  const { textInsert } = props;
  return (
    <div class="flex items-center justify-between py-4 px-8">
      <div class="w-full">
        <div class="py-2"></div>
        <div class="border-t opacity-60 py-2"></div>
      </div>
      <div>
        <span class="px-4 opacity-60 whitespace-nowrap">
          {textInsert}
        </span>
      </div>
      <div class="w-full">
        <div class="py-2"></div>
        <div class="border-t opacity-60 py-2"></div>
      </div>
    </div>
  );
}
