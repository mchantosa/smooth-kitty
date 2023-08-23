export function ContactListModal() {
  return (
    <dialog id="contact_modal" className="modal">
      <form method="dialog" className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Click the button below to close</p>
        <div className="modal-action">
          {/* if there is a button, it will close the modal */}
          <button className="btn">Close</button>
        </div>
      </form>
    </dialog>
  );
}
