// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { useState } from "preact/hooks";
import { JSX } from "preact";

//import { SITE_NAME } from "@/utils/constants.ts";

export function getFormContact(form, owner_email) {
  const id = form.get("id")?.toString();
  const first_name = form.get("first_name")?.toString();
  const last_name = form.get("last_name")?.toString();
  const pronouns = form.get("pronouns")?.toString();
  const email = form.get("email")?.toString();
  const phone = form.get("phone")?.toString();
  const preferred_method = form.get("preferred_method")?.toString();
  const preferred_method_handle = form
    .get("preferred_method_handle")
    ?.toString();
  const period = form.get("period")?.toString();
  let birthday_day = form.get("birthday_day");
  birthday_day = birthday_day ? parseInt(birthday_day) : null;
  let birthday_month = form.get("birthday_month");
  birthday_month = birthday_month ? parseInt(birthday_month) : null;
  let birthday_year = form.get("birthday_year");
  birthday_year = birthday_year ? parseInt(birthday_year) : null;
  const contact_on_birthday = form.get("contact_on_birthday") === "on";

  const newContact = {
    first_name,
    last_name,
    pronouns,
    email,
    phone,
    preferred_method,
    preferred_method_handle,
    period,
    birthday_day,
    birthday_month,
    birthday_year,
    contact_on_birthday,
    owner_email,
  };
  if (id) newContact.id = id;

  return newContact;
}

export default function ContactForm(props: any) {
  const { contact, action } = props;

  return (
    <>
      <form id="contact_form" action={action} method="post">
        <input
          name="id"
          type="text"
          class="hidden"
          value={contact ? contact.id : ""}
        />
        <h1 className="mb-4 text-2xl font-bold">Contact Information</h1>
        <h2 className="mb-2 text-xl font-semibold">Name</h2>
        <div>
          <label for="first_name">First Name</label>
          <input
            placeholder="First Name"
            name="first_name"
            id="first_name"
            type="text"
            class="input input-bordered w-full max-w-xs"
            value={contact ? contact.first_name : ""}
          />
          <label for="last_name">Last Name</label>
          <input
            placeholder="Last Name"
            name="last_name"
            id="last_name"
            type="text"
            class="input input-bordered w-full max-w-xs"
            value={contact ? contact.last_name : ""}
          />
        </div>
        <div className="mb-4">
          <label for="pronouns">Pronouns and Titles</label>
          <input
            placeholder="PhD she/her/hers"
            name="pronouns"
            id="pronouns"
            type="text"
            class="input input-bordered w-full max-w-xs"
            value={contact ? contact.pronouns : ""}
          />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Contact Information</h2>
        <div>
          <label for="email">Email</label>
          <input
            placeholder="address@domain.com"
            name="email"
            id="email"
            type="email"
            class="input input-bordered w-full max-w-xs"
            value={contact ? contact.email : ""}
          />
        </div>
        <div>
          Phone
          <label for="phone">Phone</label>
          <input
            placeholder="123-456-7890"
            name="phone"
            id="phone"
            type="phone"
            class="input input-bordered w-full max-w-xs"
            value={contact ? contact.phone : ""}
          />
        </div>
        <div className="mb-4">
          Preferred Contact Method
          <label for="preferred_method">Method</label>
          <input
            placeholder="Slack"
            name="preferred_method"
            id="preferred_method"
            type="text"
            class="input input-bordered w-full max-w-xs"
            value={contact ? contact.preferred_method : ""}
          />
          <label for="preferred_method_handle">Handle</label>
          <input
            placeholder="@handle"
            name="preferred_method_handle"
            id="preferred_method_handle"
            type="text"
            class="input input-bordered w-full max-w-xs"
            value={contact ? contact.preferred_method_handle : ""}
          />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Objectives</h2>
        <div>
          Period
          <label for="period">Period</label>
          <select
            name="period"
            id="period"
            className="select select-bordered w-full max-w-xs"
            value={contact ? contact.period : ""}
          >
            <option disabled selected value="">
              Choose an option
            </option>
            <option value="Weekly">Weekly</option>
            <option value="Biweekly">Biweekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
          </select>
        </div>
        <div className="mb-4">
          Birthday
          <label for="birthday_day">Day</label>
          <input
            placeholder="01"
            name="birthday_day"
            id="birthday_day"
            type="text"
            class="input input-bordered w-full max-w-xs"
            value={contact ? contact.birthday_day : ""}
          />
          <label for="birthday_month">Month</label>
          <select
            name="birthday_month"
            id="birthday_month"
            className="select select-bordered w-full max-w-xs"
            value={contact ? contact.birthday_month : ""}
          >
            <option value="">Choose an option</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <label for="birthday_year">Year</label>
          <input
            placeholder="2000"
            name="birthday_year"
            id="birthday_year"
            type="text"
            class="input input-bordered w-full max-w-xs"
            value={contact ? contact.birthday_year : ""}
          />
          <label for="contact_on_birthday">Contact on Birthday</label>
          <input
            type="checkbox"
            name="contact_on_birthday"
            id="contact_on_birthday"
            checked={contact && contact.contact_on_birthday}
          />
        </div>
        <input value="Save Contact" type="submit" class="btn btn-info w-full" />
      </form>
    </>
  );
}
