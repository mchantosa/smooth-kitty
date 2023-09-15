import { StateUpdater, useState } from "preact/hooks";
import ContactSummary from "@/islands/Contact.tsx";
import type { Contact } from "@/islands/Contact.tsx";
//import type { ContactSummaryProps } from "@/islands/Contact.tsx";
import { ContactListModal } from "@/islands/ContactListModal.tsx";

interface ContactListProps {
  contacts: Contact[];
}

export default function ContactList(props: ContactListProps) {
  const { contacts } = props;
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
                  <ContactSummary
                    contact={contact}
                    setActiveContact={setActiveContact}
                  ></ContactSummary>
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
        <ContactListModal
          contact={activeContact}
          setActiveContact={setActiveContact}
        ></ContactListModal>
      </div>
    </>
  );
}
