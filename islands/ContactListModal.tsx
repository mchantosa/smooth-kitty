import ContactForm from "@/components/ContactForm.tsx";

export function ContactListModal(props: any) {
  const { contact, setActiveContact } = props;

  return (
    <dialog id="contact_modal" className="modal">
      <form
        method="dialog"
        className="modal-box w-11/12 max-w-5xl"
        onKeyUp={(e) => {
          if (e.key === "Escape") {
            setActiveContact(null);
          }
        }}
      >
        <ContactForm contact={contact} action="contacts"></ContactForm>
        <div className="modal-action">
          {/* if there is a button, it will close the modal */}
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
