import { useEffect, useState } from "preact/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "zod-resolver";
import { contactSchema } from "@/shared/data/contact.ts";
import axios from "axiod";
import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/mod.ts";
import Divider from "@/components/Divider.tsx";
import ImageWithFallback from "@/islands/ImageWithFallback.tsx";

const get119YearsAgo = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 119);
  return date.getFullYear();
};

interface ContactFormProps {
  endpoint?: string;
  redirect?: string;
  id?: string;
}

const ContactForm = ({ endpoint, redirect, id }: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const watchFirstName = watch("firstName", ""); // you can supply default value as second argument
  const watchLastName = watch("lastName", "");
  const watchAvatarUrl = watch("avatarUrl", "");

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const inputClassNames =
    "input input-bordered w-full max-w-md px-3 py-2 focus:outline-none focus:shadow-outline";
  const selectClassNames = "select select-bordered";
  const selectClassNamesWarningFull = "select select-bordered" +
    " w-full" +
    " select-warning";
  const textErrorClassNames = "text-error text-xs italic pt-2";
  const annotationClassNames = "text-xs italic";
  const labelClassNames = "block text-sm font-bold opacity-60 mb-2";

  async function loadContact() {
    if (endpoint) {
      const resp = await fetch(endpoint);
      const data = await resp.json();
      const { value: contact } = data;
      if(contact.lastConnection) setValue("lastConnection", contact.lastConnection);
      if(contact.nextConnection)setValue("nextConnection", contact.nextConnection);
      setValue("firstName", contact.firstName);
      setValue("lastName", contact.lastName);
      setValue("pronouns", contact.pronouns);
      setValue("avatarUrl", contact.avatarUrl);
      setValue("email", contact.email);
      setValue("phoneNumber", contact.phoneNumber);
      setValue("preferredMethod", contact.preferredMethod);
      setValue("preferredMethodHandle", contact.preferredMethodHandle);
      setValue("birthdayDay", contact.birthdayDay);
      setValue("birthdayMonth", contact.birthdayMonth);
      setValue("birthdayYear", contact.birthdayYear);
      setValue("connectOnBirthday", contact.connectOnBirthday);
      setValue("period", contact.period);
    }
  }

  useEffect(() => {
    loadContact();
  }, []);

  return (
    <form
      class="max-w-md mx-auto p-8 bg-default rounded shadow-lg"
      // @ts-ignore TODO: fix react-hook-form types
      onSubmit={handleSubmit((d) => {
        console.log("I am in the submit function")
        const contact = getValues();
        // const contact = getValues();
        console.log("contact",contact);
        // console.log("d",d);
        const formData = new FormData();
        if (id) formData.append("id", id);
        if(contact.lastConnection) formData.append("lastConnection", contact.lastConnection);
        if(contact.nextConnection) formData.append("nextConnection", contact.nextConnection);
        formData.append("firstName", d.firstName);
        formData.append("lastName", d.lastName);
        formData.append("pronouns", d.pronouns);
        formData.append("avatarUrl", d.avatarUrl);
        formData.append("phoneNumber", d.phoneNumber);
        formData.append("email", d.email);
        formData.append("preferredMethod", d.preferredMethod);
        formData.append("preferredMethodHandle", d.preferredMethodHandle);
        formData.append("period", d.period);
        formData.append("birthdayDay", d.birthdayDay);
        formData.append("birthdayMonth", d.birthdayMonth);
        formData.append("birthdayYear", d.birthdayYear);
        formData.append("connectOnBirthday", d.connectOnBirthday);
        axios.post("/api/contacts", formData).then((res) => {
          window.location.href = redirect || "/contacts";
        });
      })}
    >
      <Divider textInsert="Name" />
      <div class="mb-6">
        <label
          for="firstName"
          className={labelClassNames}
        >
          First Name
        </label>
        <input
          id="firstName"
          className={inputClassNames}
          placeholder="Jane"
          {...register("firstName")}
        >
        </input>
        {errors.firstName?.message && (
          <p className={textErrorClassNames}>{errors.firstName?.message}</p>
        )}
      </div>
      <div class="mb-6">
        <label
          for="lastName"
          className={labelClassNames}
        >
          Last Name
        </label>
        <input
          id="lastName"
          className={inputClassNames}
          placeholder="Doe"
          {...register("lastName")}
        >
        </input>
        {errors.lastName?.message && (
          <p className={textErrorClassNames}>{errors.lastName?.message}</p>
        )}
      </div>
      <div class="mb-6">
        <label
          for="fullName"
          className={labelClassNames}
        >
          Full Name{" "}
          <span className={annotationClassNames}>
            (modify First and Last Name to update)
          </span>
        </label>
        <div class="border-warning border-1 rounded-lg">
          <input
            id="fullName"
            disabled
            value={`${watchFirstName} ${watchLastName}`.trim()}
            className={inputClassNames}
          >
          </input>
        </div>
        {errors.name?.message && (
          <p className={textErrorClassNames}>{errors.name?.message}</p>
        )}
      </div>
      <div class="mb-6">
        <label
          for="pronouns"
          className={labelClassNames}
        >
          Titles and Pronouns
        </label>
        <input
          id="pronouns"
          className={inputClassNames}
          placeholder="she/her, Dr."
          {...register("pronouns")}
        >
        </input>
        {errors.pronouns?.message && (
          <p className={textErrorClassNames}>{errors.pronouns?.message}</p>
        )}
      </div>
      <div class="mb-6">
        <label
          for="avatarUrl"
          className={labelClassNames}
        >
          Avatar URL{" "}
          <span className={annotationClassNames}>
            (must be a publicly available image)
          </span>
        </label>
        <input
          id="avatarUrl"
          className={inputClassNames}
          placeholder="https://example.com/avatar.png"
          {...register("avatarUrl")}
        >
        </input>
        <div class="flex justify-center">
          <div class="avatar pt-8">
            <div class="mask mask-squircle w-36 h-36 mr-8">
              <ImageWithFallback
                src={watchAvatarUrl}
                defaultSrc="/images/avatar_icon_green.png"
                alt="Contact avatar"
                className="w-full"
              />
            </div>
          </div>
        </div>
        <p className={labelClassNames + " p-4 text-center"}>
          Preview
        </p>
      </div>
      <Divider textInsert="Contact Information" />
      <div class="mb-6">
        <label
          for="phoneNumber"
          className={labelClassNames}
        >
          Phone
        </label>
        <input
          id="phoneNumber"
          className={inputClassNames}
          placeholder="555-555-5555"
          {...register("phoneNumber")}
        >
        </input>
        {errors.phoneNumber?.message && (
          <p className={textErrorClassNames}>{errors.phoneNumber?.message}</p>
        )}
      </div>
      <div class="mb-6">
        <label
          for="email"
          className={labelClassNames}
        >
          Email
        </label>
        <input
          id="email"
          className={inputClassNames}
          placeholder="myemail@domain.com"
          {...register("email")}
        >
        </input>
        {errors.email?.message && (
          <p className={textErrorClassNames}>{errors.email?.message}</p>
        )}
      </div>
      <div class="mb-6">
        <label
          for="preferredMethod"
          className={labelClassNames}
        >
          Preferred Method
        </label>
        <input
          id="preferredMethod"
          className={inputClassNames}
          placeholder="Slack or Twitter"
          {...register("preferredMethod")}
        >
        </input>
        {errors.preferredMethod?.message && (
          <p className={textErrorClassNames}>
            {errors.preferredMethod?.message}
          </p>
        )}
      </div>
      <div class="mb-6">
        <label
          for="preferredMethodHandle"
          className={labelClassNames}
        >
          Preferred Method Handle
        </label>
        <input
          id="preferredMethodHandle"
          className={inputClassNames}
          placeholder="@slackhandle, @twitterhandle"
          {...register("preferredMethodHandle")}
        >
        </input>
        {errors.preferredMethodHandle?.message && (
          <p className={textErrorClassNames}>
            {errors.preferredMethodHandle?.message}
          </p>
        )}
      </div>
      <Divider textInsert="Contact Objectives" />
      <div class="mb-6">
        <label
          for="period"
          className={labelClassNames}
        >
          Period
        </label>
        <select
          id="period"
          className={selectClassNamesWarningFull}
          {...register("period")}
        >
          <option selected={!getValues("period")} disabled></option>
          <option selected={getValues("period") === "Weekly"} value="Weekly">
            Weekly
          </option>
          <option
            selected={getValues("period") === "Biweekly"}
            value="Biweekly"
          >
            Biweekly
          </option>
          <option selected={getValues("period") === "Monthly"} value="Monthly">
            Monthly
          </option>
          <option
            selected={getValues("period") === "Quarterly"}
            value="Quarterly"
          >
            Quarterly
          </option>
        </select>
        {errors.period?.message && (
          <p className={textErrorClassNames}>{errors.period?.message}</p>
        )}
      </div>
      <div class="mb-6">
        <p className={labelClassNames}>
          Birthday{" "}
          <span className={annotationClassNames}>
            (optional, a day and month is sufficient)
          </span>
        </p>
        <div class="flex">
          <div class="pr-2">
            <label
              for="birthdayDay"
              className={labelClassNames}
            >
              Day
            </label>
            <select
              id="birthdayDay"
              className={selectClassNames}
              {...register("birthdayDay", { valueAsNumber: true })}
            >
              <option value="0"></option>
              {Array.from({ length: 31 }, (_, i) => i).map((
                i,
              ) => (
                <option
                  selected={getValues("birthdayDay") == i + 1}
                  key={nanoid()}
                  value={i + 1}
                >
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div class="pr-2">
            <label
              for="birthdayMonth"
              className={labelClassNames}
            >
              Month
            </label>
            <select
              id="birthdayMonth"
              className={selectClassNames}
              {...register("birthdayMonth", { valueAsNumber: true })}
            >
              <option value="-1"></option>
              {MONTHS.map((month, i) => (
                <option
                  selected={getValues("birthdayMonth") == i}
                  key={nanoid()}
                  value={i}
                >
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              for="birthdayYear"
              className={labelClassNames}
            >
              Year
            </label>
            <select
              id="birthdayYear"
              className={selectClassNames}
              {...register("birthdayYear", { valueAsNumber: true })}
            >
              <option value="0"></option>
              {Array.from({ length: 120 }, (_, i) => 119 + get119YearsAgo() - i)
                .map((
                  year,
                ) => (
                  <option
                    selected={getValues("birthdayYear") == year}
                    key={nanoid()}
                    value={year}
                  >
                    {year}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {errors.date?.message && (
          <p className={textErrorClassNames}>{errors.date?.message}</p>
        )}
      </div>
      <div class="mb-6">
        <label
          for="connectOnBirthday"
          className={labelClassNames}
        >
          Contact on Birthday
        </label>
        <input
          id="connectOnBirthday"
          type="checkbox"
          {...register("connectOnBirthday", { setValueAs: (v) => Boolean(v) })}
          class="checkbox"
        />
        {errors.connectOnBirthday?.message && (
          <p className={textErrorClassNames}>
            {errors.connectOnBirthday?.message}
          </p>
        )}
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};

export default ContactForm;
