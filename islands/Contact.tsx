import axiod from "https://deno.land/x/axiod/mod.ts";

const avatarURL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/2048px-Avatar_icon_green.svg.png";

function contactHandler() {
  console.log("contact clicked");
  window.contact_modal.showModal();
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

        axiod
          .delete(`/api/contacts/${props.contactId}`)
          .then((response) => {
            console.log(response);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }}
    >
      remove
    </button>
  );
}

export default function Contact(props: any) {
  const { contact } = props;

  return (
    <>
      <tr onClick={contactHandler}>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={avatarURL} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{`${contact.first_name} ${contact.last_name}`}</div>
              <div className="text-sm opacity-50">Placeholder</div>
            </div>
          </div>
        </td>
        <td>
          Next Connection
          <br />
          <span className="badge badge-ghost badge-sm">Date</span>
        </td>
        <td>Period</td>
        <td>
          Phone number: <br />
          Email: <br />
          Preferred Method: Handle
        </td>
        <th>
          <DeleteContactButton contactId={contact.id}></DeleteContactButton>
        </th>
      </tr>
    </>
  );
}
