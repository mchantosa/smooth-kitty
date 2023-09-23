// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { useSignal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
import type { Contact } from "@/shared/data/contact.ts";
import { LINK_STYLES } from "@/utils/constants.ts";
import IconInfo from "tabler_icons_tsx/info-circle.tsx";
import { fetchValues } from "@/utils/islands.ts";

function EmptyItemsList() {
  return (
    <>
      <div class="flex flex-col justify-center items-center gap-2">
        <div class="flex flex-col items-center gap-2 pt-16">
          <IconInfo class="w-10 h-10 text-gray-400 dark:text-gray-600" />
          <p class="text-center font-medium">No items found</p>
          <p class="text-center font-medium">
            Pull items from 'Coming Up' to fill your board
          </p>
        </div>
      </div>
    </>
  );
}

export default function DashboardList(props: {
  endpoint: string;
}) {
  const itemsSig = useSignal<Contact[]>([]);
  const cursorSig = useSignal("");
  const isLoadingSig = useSignal(false);
  const [searchText, setSearchText] = useState("");

  async function loadMoreItems() {
    if (isLoadingSig.value) return;
    isLoadingSig.value = true;
    try {
      const { values, cursor } = await fetchValues<Contact>(
        props.endpoint,
        cursorSig.value,
      );
      itemsSig.value = [...itemsSig.value, ...values];
      cursorSig.value = cursor;
    } catch (error) {
      console.error(error.message);
    } finally {
      isLoadingSig.value = false;
    }
  }

  useEffect(() => {
    loadMoreItems();
  }, []);

  const SnoozeContactButton = (props: {
    contactId?: string;
  }) => {
    const { contactId } = props;
    return (
      <button
        className="btn btn-primary btn-xs m-1"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          console.log(`Snoozing: ${contactId}...`);
        }}
      >
        Snooze
      </button>
    );
  };

  const UpdateConnectionButton = (props: {
    contactId?: string;
  }) => {
    const { contactId } = props;
    return (
      <button
        className="btn btn-primary btn-xs m-1"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          console.log(`Updating connection for: ${contactId}...`);
        }}
      >
        Connected
      </button>
    );
  };

  const DashboardComponent = (
    { contact }: {
      contact: Contact;
    },
  ) => {
    const {
      id,
      avatarUrl,
      fullName,
      pronouns,
      nextConnection,
      period,
      phoneNumber,
      email,
      preferredMethod,
      preferredMethodHandle,
    } = contact;

    return (
      <div className="card w-60 bg-base-100 shadow-xl p-4 m-2">
        <figure>
          <img
            src={avatarUrl}
            alt="avatar"
          />
        </figure>
        <div className="p-2">
          <h2 className="card-title">
            {fullName}
          </h2>
          <div className="">Last Connection</div>
          <div className="flex justify-center">
            <UpdateConnectionButton contactId={id} />
            <SnoozeContactButton contactId={id} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div class="flex flex-wrap">
        {itemsSig.value.length
          ? (
            itemsSig.value.map((item, id) => {
              return <DashboardComponent contact={item} />;
            })
          )
          : <EmptyItemsList />}
      </div>

      {cursorSig.value !== "" && (
        <button onClick={loadMoreItems} class={LINK_STYLES}>
          {isLoadingSig.value ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
