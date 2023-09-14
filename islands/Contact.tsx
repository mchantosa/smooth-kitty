const avatarURL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/2048px-Avatar_icon_green.svg.png";

export interface Contact {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  pronouns: string;
  email: string;
  phone: string;
  preferred_method: string;
  preferred_method_handle: string;
  period: string;
}

function DeleteContactButton(props: any) {
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
}

export default function Contact(props: any) {
  const { contact, setActiveContact } = props;

  return (
    <>
      <tr
        className="group cursor-pointer hover:backdrop-brightness-125 hover:shadow-lg"
        onClick={() => {
          setActiveContact(contact);
          // @ts-ignore global-modal
          const modal = window.contact_modal;
          modal.showModal();
        }}
      >
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={avatarURL} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">
                <span>{`${contact.full_name}`}</span>
              </div>
              {contact.pronouns && (
                <span className="ml-2 badge badge-ghost badge-sm">
                  <span>{`${contact.pronouns}`}</span>
                </span>
              )}
            </div>
          </div>
        </td>
        <td>Date Placeholder</td>
        <td> {contact.period}</td>
        <td>
          <strong>Phone number:</strong>{" "}
          <span className="pl-4 text-cyan-700">{contact.phone}</span>
          <br />
          <strong>Email: </strong>
          <span className="pl-4 text-cyan-700">{contact.email}</span>
          <br />
          <strong>Preferred Method: </strong>
          <span className="pl-4 text-cyan-700">{contact.preferred_method}</span>
          <br />
          <span className="ml-2 badge badge-ghost badge-sm">
            <strong>Handle: </strong>
            <span className="pl-4 text-cyan-700">
              {contact.preferred_method_handle}
            </span>
          </span>
        </td>
        <th>
          <DeleteContactButton contactId={contact.id}></DeleteContactButton>
        </th>
      </tr>
    </>
  );
}
