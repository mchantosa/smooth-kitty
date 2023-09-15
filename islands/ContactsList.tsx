// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
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
        </div>

        <a
          href="/submit"
          class="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-primary hover:underline"
        >
          Add a contact
        </a>
      </div>
    </>
  );
}

export default function ContactsList(props: {
  endpoint: string;
  isSignedIn: boolean;
}) {
  const itemsSig = useSignal<Contact[]>([]);
  const cursorSig = useSignal("");
  const isLoadingSig = useSignal(false);

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
    if (!props.isSignedIn) {
      loadMoreItems();
      return;
    }
  }, []);

  type ContactComponentProps = {
    contact: Contact;
  };

  const ContactComponent = ({ contact }: ContactComponentProps) => {
    const { firstName, lastName, phoneNumber, email } = contact;
    const getRandomFaceUrl = () =>
      `/images/faces/face_${Math.floor(Math.random() * 10) + 1}.jpeg`;
    return (
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <td>
          <div class="flex items-center space-x-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img
                  src={getRandomFaceUrl()}
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div>
              <div class="font-bold">{`${firstName} ${lastName}`}</div>
              <div class="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          <div class="text-sm">Phone: {`${phoneNumber}`}</div>
          <div class="text-sm">Email: {`${email}`}</div>
        </td>
        <td>[ TODO ]</td>
        <th>
          <button class="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    );
  };

  return (
    <div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Contact Info</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {itemsSig.value.length
              ? (
                itemsSig.value.map((item, id) => {
                  return <ContactComponent contact={item} />;
                })
              )
              : <EmptyItemsList />}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Contact Info</th>
              <th>Action</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>

      {cursorSig.value !== "" && (
        <button onClick={loadMoreItems} class={LINK_STYLES}>
          {isLoadingSig.value ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
