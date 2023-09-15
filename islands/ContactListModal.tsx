// import ContactForm from "@/components/ContactForm.tsx";

import { Contact } from "@/islands/Contact.tsx";
import { StateUpdater } from "preact/hooks";

interface ContactListModalProps {
  contact: Contact;
  setActiveContact: StateUpdater<Contact | null>;
}

export function ContactListModal(props: ContactListModalProps) {
  const { contact, setActiveContact } = props;

  console.log("contact", contact);

  return (
    <dialog id="contact_modal" className="modal">
      <form
        method="dialog"
        className="modal-box w-11/12 max-w-5xl"
        onKeyUp={(e) => {
          if (e.key === "Escape") {
            debugger;
            console.log(
              `exitting contact ${contact ? contact.id : contact}...`
            );
            setActiveContact(null);
          }
        }}
      >
        {contact && contact.full_name}
        <div className="modal-action">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => {
              setActiveContact(null);
            }}
          >
            ✕
          </button>
        </div>
      </form>
    </dialog>
  );
}
