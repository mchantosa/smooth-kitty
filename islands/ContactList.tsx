import { useState } from "preact/hooks";
import Contact from "@/islands/Contact.tsx";
import type { Contact as AContact } from "@/islands/Contact.tsx";

interface ContactListProps {
  pagination: any;
  contacts: AContact[];
}

export default function ContactList(props: ContactListProps) {
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
        {/* <Pagination pagination={pagination}></Pagination> */}
        {/* <ContactListModal
          contact={activeContact}
          setActiveContact={setActiveContact}
        ></ContactListModal> */}
      </div>
    </>
  );
}
