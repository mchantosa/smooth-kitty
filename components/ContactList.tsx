// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { JSX } from "preact";
import { Pagination } from "../islands/Pagination.tsx";
import Contact from "@/islands/Contact.tsx";
import { ContactListModal } from "@/islands/ContactListModal.tsx";

export default function ContactList(
  props: JSX.HTMLAttributes<HTMLImageElement>
) {
  const { contacts, pagination } = props;

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
                return <Contact contact={contact}></Contact>;
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
        <ContactListModal></ContactListModal>
      </div>
    </>
  );
}
