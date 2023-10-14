import type { Contact as IContact } from "@/shared/data/contact.ts";
import axios from "axiod";
import { useEffect, useState } from "preact/hooks";
import {
  convertDBDateToPretty,
  getBirthdayContactDatePretty,
} from "@/utils/dates.ts";

interface ContactProps {
  contact: IContact;
  isChecked?: boolean;
  checkedContactIds?: {};
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
  const { contact, isChecked, checkedContactIds } = props;
  const {
    id,
    avatarUrl,
    fullName,
    pronouns,
    nextConnection,
    lastConnection,
    period,
    birthdayDay,
    birthdayMonth,
    birthdayYear,
    connectOnBirthday,
    phoneNumber,
    email,
    preferredMethod,
    preferredMethodHandle,
  } = contact;

  const [localChecked, setLocalChecked] = useState(false);

  useEffect(() => {
    checkedContactIds[id] = isChecked;
    setLocalChecked(isChecked);
  }, [isChecked]);

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
        <input
          type="checkbox"
          className="checkbox checkbox-neutral"
          checked={localChecked}
          onClick={(e) => {
            e.stopPropagation();
            checkedContactIds[id] = !localChecked;
            setLocalChecked(!localChecked);
          }}
        />
      </td>
      <td>
        <div class="flex items-center space-x-3">
          <div class="avatar">
            <div class="mask mask-squircle w-12 h-12">
              <object 
                data={avatarUrl}
                className="w-full"
              >
               <img 
                  src="/images/avatar_icon_green.png" 
                  alt="Avatar Tailwind CSS Component"/>
              </object>
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
            {convertDBDateToPretty(nextConnection)}
          </span>
        </div>
        {connectOnBirthday && !!birthdayDay && !!birthdayMonth && (
          <div>
            <strong className="opacity-60">Birthday:</strong>
            <span className="pl-4 text-accent whitespace-nowrap">
              {getBirthdayContactDatePretty(
                parseInt(birthdayDay),
                parseInt(birthdayMonth),
              )}
            </span>
          </div>
        )}
        <div>
          <strong className="opacity-60">Last:</strong>
          <span className="pl-4 text-accent whitespace-nowrap">
            {convertDBDateToPretty(lastConnection)}
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
