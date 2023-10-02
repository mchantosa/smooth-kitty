import { effect, useSignal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/mod.ts";
import { fetchValues } from "@/utils/islands.ts";
import { ContactSearch } from "@/islands/ContactSearch.tsx";
import IconInfo from "tabler_icons_tsx/info-circle.tsx";
import { Contact } from "@/islands/Contact.tsx";

const Loader = () => (
  <div class="flex items-center justify-center h-40">
    <span class="loading loading-spinner loading-lg"></span>
  </div>
);

const NoContacts = () => (
  <>
    <div class="flex flex-col justify-center items-center gap-2">
      <div class="flex flex-col items-center gap-2 pt-16">
        <IconInfo class="w-10 h-10 text-gray-400 dark:text-gray-600" />
        <p class="text-center font-medium">You have no contacts</p>
      </div>

      <a
        href="/contacts/new"
        class="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-primary hover:underline"
      >
        Add a contact
      </a>
    </div>
  </>
);

const NotFound = () => ( <>
  <tr>
    <td colspan="6">
      <div class="w-full">
        <div class="flex flex-col justify-center items-center gap-2">
        <IconInfo class="w-10 h-10 text-gray-400 dark:text-gray-600" />
          <p class="font-medium">No contacts found</p>
        </div>      
      </div>
    </td>
  </tr>
</>);

export default function ContactsList(props: {
  endpoint: string;
}) {
  const cursorSig = useSignal("");
  const isLoadingSig = useSignal(true);
  const searchTextSig = useSignal("");
  const allContactsSig = useSignal([]);
  const filteredContactsSig = useSignal(allContactsSig.value);

  function groupAndReturnFirstOccurrence(arr) {
    const grouped = {};
    const result = [];
  
    for (const item of arr) {
      const letter = item.fullName[0].toUpperCase();
      if (!grouped[letter]) {
        grouped[letter] = true;
        result.push(item);
      }
    }
    return result;
  }

  const NavBar = () => {
    return (
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {groupAndReturnFirstOccurrence(filteredContactsSig.value).map((contact) => {
            return (<li><a href={`#${contact.id}`}>{contact.fullName[0].toUpperCase()}</a></li>)
          })}
        </ul>
      </div>
    )
  }

  effect(() => {//runs every time a signal changes
    if (searchTextSig.value === "") {
      filteredContactsSig.value = allContactsSig.value;
      return;
    }
    const filtered = allContactsSig.value.filter((contact) =>
      contact?.firstName?.toLowerCase().includes(searchTextSig.value.toLowerCase()) ||
      contact?.lastName?.toLowerCase().includes(searchTextSig.value.toLowerCase())
    );
    filteredContactsSig.value = filtered;
  });

  useEffect(async () => {//runs every time a component renders
    await loadContacts();
  }, []);

  async function loadContacts() {
    try {
      const { values, cursor } = await fetchValues<Contact>(
        props.endpoint,
        cursorSig.value,
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      allContactsSig.value = [...values];
      filteredContactsSig.value = [...values];
      cursorSig.value = cursor;
    } catch (error) {
      console.error(error.message);
    } finally {
      isLoadingSig.value = false;
    }
  }

  return (
    <>
      <div>
        {isLoadingSig.value && <Loader />}
        {!isLoadingSig.value && !allContactsSig.value.length && <NoContacts />}
        {!isLoadingSig.value && allContactsSig.value.length > 0 && (
          <div class="overflow-x-auto">
            <div class="flex items-center justify-flex-end">
              <NavBar/>
              <ContactSearch searchText={searchTextSig}></ContactSearch>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Next Connection</th>
                  <th>Period</th>
                  <th>Contact Information</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { !filteredContactsSig.value.length && <NotFound /> }
                { Boolean(filteredContactsSig.value.length) 
                  && filteredContactsSig.value.map((contact)=><Contact contact={contact}/>)}
              </tbody>
            </table>
            </div>
        )}
      </div>
    </>
  );
}





