import type { Contact as IContact } from "@/shared/data/contact.ts";
import axios from "npm:axios";

interface ContactProps {
  contact: IContact;
}

const DeleteContactButton = (props: {
  contactId?: string;
}) => {
  const { contactId } = props;
  return (
    <button
      className="badge bdg-btn-remove badge-neutral"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        axios.delete(`/api/contacts/${contactId}`).then((res) => {
          window.location.href = "/contacts";
        });
      }}
    >
      Remove
    </button>
  );
};

export const Contact = (props: ContactProps) => {
  const { contact } = props;
  const {
    id,
    avatarUrl,
    fullName,
    pronouns,
    nextConnection,
    lastConnection,
    period,
    phoneNumber,
    email,
    preferredMethod,
    preferredMethodHandle,
  } = contact;

  // console.log("name", fullName);
  // console.log("letterNav", letterNav);

  return (
    <tr
      className="group cursor-pointer hover:backdrop-brightness-125 hover:shadow-lg"
      id={contact.id}
      onClick={(e) => {
        e.preventDefault();
        window.location.href = `/contacts/${id}/edit`;
      }}
    >
      <td>
        <div class="flex items-center space-x-3">
          <div class="avatar">
            <div class="mask mask-squircle w-12 h-12">
              <img
                src={avatarUrl}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div class="font-bold opacity-60">{`${fullName}`}</div>
            <div>
              {pronouns && (
                <span className="ml-2 badge badge-ghost badge-sm">
                  <span>{`${pronouns}`}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </td>
      <td>
        <div>
          <strong className="opacity-60">Next:</strong>
          <span className="pl-4 text-accent whitespace-nowrap">
            {nextConnection}
          </span>
        </div>
        <div>
          <strong className="opacity-60">Last:</strong>
          <span className="pl-4 text-accent whitespace-nowrap">
            {lastConnection}
          </span>
        </div>
      </td>
      <td>
        <span className="opacity-60">{period}</span>
      </td>
      <td>
        <strong className="opacity-60">Phone number:</strong>
        <span className="pl-4 text-accent">{phoneNumber}</span>
        <br />
        <strong className="opacity-60">Email:</strong>
        <span className="pl-4 text-accent">{email}</span>
        <br />
        <strong className="opacity-60">Preferred Method:</strong>
        <span className="pl-4 text-accent">{preferredMethod}</span>
        <br />
        <span className="ml-2 badge badge-ghost badge-sm">
          <strong>Handle:</strong>
          <span className="pl-4 text-accent">
            {preferredMethodHandle}
          </span>
        </span>
      </td>
      <th>
        <DeleteContactButton contactId={id}></DeleteContactButton>
      </th>
    </tr>
  );
};
