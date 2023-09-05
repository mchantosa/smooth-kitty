// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { JSX } from "preact";
import { Pagination } from "../islands/Pagination.tsx";
import Contact from "@/islands/Contact.tsx";
import { ContactListModal } from "@/islands/ContactListModal.tsx";
import { useState } from "preact/hooks";

export default function ContactList(
  props: JSX.HTMLAttributes<HTMLImageElement>
) {
  const { pagination, contacts } = props;
  //const [contacts, setContacts] = useState(props.contacts);
  const [activeContact, setActiveContact] = useState();

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
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
            {contacts &&
              contacts.map((contact) => {
                return (
                  <Contact
                    contact={contact}
                    setActiveContact={setActiveContact}
                  ></Contact>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Next Connection</th>
              <th>Period</th>
              <th>Contact Information</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
        <Pagination pagination={pagination}></Pagination>
        <ContactListModal contact={activeContact}></ContactListModal>
      </div>
    </>
  );
}
