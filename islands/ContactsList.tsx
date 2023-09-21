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

  interface DeleteContactButtonProps {
    contactId?: string;
  }

  const DeleteContactButton = (props: DeleteContactButtonProps) => {
    const { contactId } = props;
    return (
      <button
        className="badge bdg-btn-remove badge-neutral"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          console.log(`deleting ${props.contactId}...`);

          // axiod
          //   .delete(`/api/contacts/${props.contactId}`)
          //   .then((response) => {
          //     console.log(response);
          //     window.location.reload();
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });
        }}
      >
        remove
      </button>
    );
  };

  interface ContactComponentProps {
    contact: Contact;
  }

  const ContactComponent = ({ contact }: ContactComponentProps) => {
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
      <tr
        className="group cursor-pointer hover:backdrop-brightness-125 hover:shadow-lg"
        onClick={(e) => {
          e.preventDefault();
          console.log(`opening ${id}...`);
        }}
      >
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
                  src={avatarUrl}
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div>
              <div class="font-bold">{`${fullName}`}</div>
              <div>
                {pronouns && (
                  <span className="ml-2 badge badge-ghost badge-sm">
                    <span>{`${pronouns}`}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </td>
        <td>{nextConnection}</td>
        <td>{period}</td>
        <td>
          <strong>Phone number:</strong>{" "}
          <span className="pl-4 text-cyan-700">{phoneNumber}</span>
          <br />
          <strong>Email:</strong>
          <span className="pl-4 text-cyan-700">{email}</span>
          <br />
          <strong>Preferred Method:</strong>
          <span className="pl-4 text-cyan-700">{preferredMethod}</span>
          <br />
          <span className="ml-2 badge badge-ghost badge-sm">
            <strong>Handle:</strong>
            <span className="pl-4 text-cyan-700">
              {preferredMethodHandle}
            </span>
          </span>
        </td>
        <th>
          <DeleteContactButton contactId={id}></DeleteContactButton>
        </th>
      </tr>
    );
  };

  const handleSearchChange = (e: Event) => {
    if (e.target) setSearchText(e.target.value);
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") console.log("text:", searchText);
  };

  return (
    <div>
      <div class="overflow-x-auto">
        <div class="flex items-center justify-flex-end">
          <div className="form-control w-full max-w-xs">
            <select className="select select-bordered">
              <option selected>Name</option>
              <option>Next Connection</option>
              <option>Period</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search contacts"
            className="input input-bordered w-full max-w-xs"
            onKeyUp={handleEnter}
            onChange={handleSearchChange}
          />
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Next Connection</th>
              <th>Period</th>
              <th>Contact Information</th>
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
              <th>Next Connection</th>
              <th>Period</th>
              <th>Contact Information</th>
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
