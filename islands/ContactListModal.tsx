import ContactForm from "@/components/ContactForm.tsx";

const clearForm = () => {
  const modal = document.getElementById("contact_modal");
  console.log(modal);
  modal?.close();
  // @ts-ignore
  const form = document.getElementById("contact_form");
  console.log(form);
  form.reset();
};

export function ContactListModal(props: any) {
  const { contact } = props;

  return (
    <dialog id="contact_modal" className="modal">
      <form method="dialog" className="modal-box w-11/12 max-w-5xl">
        <ContactForm contact={contact} action="contacts"></ContactForm>
        <div className="modal-action">
          {/* if there is a button, it will close the modal */}
          <button className="btn" onClick={clearForm}>
            Close
          </button>
        </div>
      </form>
    </dialog>
  );
}
