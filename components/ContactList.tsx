// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { JSX } from "preact";
import DeleteContactButton from "../islands/DeleteContactButton.tsx";
import { Pagination } from "../islands/Pagination.tsx";

export default function ContactList(
  props: JSX.HTMLAttributes<HTMLImageElement>
) {
  const avatar =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/2048px-Avatar_icon_green.svg.png";

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
            {props.contacts &&
              props.contacts.map((contact) => {
                return (
                  <tr>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/2048px-Avatar_icon_green.svg.png"
                              alt="Avatar Tailwind CSS Component"
                            />
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
                      Preffered Method: Handle
                    </td>
                    <th>
                      <DeleteContactButton
                        contactId={contact.id}
                      ></DeleteContactButton>
                    </th>
                  </tr>
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
        <Pagination pagination={props.pagination}></Pagination>
      </div>
    </>
  );
}
