// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { JSX } from "preact";
//import { SITE_NAME } from "@/utils/constants.ts";

export default function ContactList(
  props: JSX.HTMLAttributes<HTMLImageElement>
) {
  const avatar =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/2048px-Avatar_icon_green.svg.png";

  //   const first_name = props.contacts[0].first_name;
  //   const last_name = props.contacts[0].last_name;
  //   console.log(first_name, last_name);
  console.log(props.contacts);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Placeholder</th>
              <th>Placeholder2</th>
              <th></th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {props.contacts.map((contact) => {
              return (
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
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
                    Column 2 Data
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Column 2 Support Data
                    </span>
                  </td>
                  <td>Column 3 Data</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              );
            })}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Placeholder</th>
              <th>Placeholder2</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
