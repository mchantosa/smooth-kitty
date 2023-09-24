import { useForm } from "react-hook-form";
import { zodResolver } from "zod-resolver";
import { contactSchema } from "@/shared/data/contact.ts";
//import { add, format, nextSunday } from "date-fns";
import axios from "npm:axios";
import Divider from "@/components/Divider.tsx";

const get119YearsAgo = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 119);
  return date.getFullYear();
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    getValues, 
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const watchFirstName = watch("firstName", "") // you can supply default value as second argument
  const watchLastName = watch("lastName", "")
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
    "December"
  ];

  return (
    <form
      class="max-w-md mx-auto p-8 bg-default rounded shadow-lg"
      // @ts-ignore TODO: fix react-hook-form types
      onSubmit={handleSubmit((d) => {
        const formData = new FormData();
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
          window.location.href = "/contacts";
        });
      })}
    >
      <Divider textInsert="Name" />
      <div class="mb-4">
        <label
          for="firstName"
          class="block text-sm font-bold text-neutral mb-2"
        >
          First name
        </label>
        <input
          id="firstName"
          class="input input-bordered w-full max-w-md px-3 py-2 focus:outline-none focus:shadow-outline"
          {...register("firstName")}
        >
        </input>
      </div>
      <div class="mb-4">
        <label
          for="lastName"
          class="block text-sm font-bold text-neutral mb-2"
        >
          Last name
        </label>
        <input
          id="lastName"
          class="input input-bordered w-full max-w-md px-3 py-2 focus:outline-none focus:shadow-outline"
          {...register("lastName")}
        >
        </input>
      </div>
      <div class="mb-4">
        <label
          for="fullName"
          class="block text-sm font-bold text-neutral mb-2"
        >
          Full Name
        </label>
        <div class="border-warning border-1 rounded-lg">
          <input
            id="fullName"
            disabled
            value={`${watchFirstName} ${watchLastName}`.trim()}
            class="input input-bordered input-warning w-full max-w-md px-3 py-2 focus:outline-none focus:shadow-outline"
          >
          </input>
        </div>
      </div>
      <div class="mb-4">
        <label
          for="pronouns"
          class="block text-sm font-bold text-neutral mb-2"
        >
          Titles and Pronouns
        </label>
        <input
          id="pronouns"
          class="input input-bordered w-full max-w-md px-3 py-2 focus:outline-none focus:shadow-outline"
          {...register("pronouns")}
        >
        </input>
      </div>
      <div class="mb-4">
        <label
          for="avatarUrl"
          class="block text-sm font-bold text-neutral mb-2"
        >
          Avatar URL
        </label>
        <input
          id="avatarUrl"
          class="input input-bordered w-full max-w-md px-3 py-2 focus:outline-none focus:shadow-outline"
          {...register("avatarUrl")}
        >
        </input>
      </div>
      <Divider textInsert="Contact Information" />
      <div class="mb-4">
        <label

          for="phoneNumber"
          class="block text-sm font-bold text-neutral mb-2"
        >
          Phone
        </label>
        <input
        id="phoneNumber"
          {...register("phoneNumber")}
          class="input input-bordered w-full max-w-md px-3 py-2 focus:outline-none focus:shadow-outline"
        >
        </input>
      </div>
      <div class="mb-4">
        <label
          for="email"
          class="block text-sm font-bold text-neutral mb-2"
        >
          Email
        </label>
        <input
        id="email"
          {...register("email")}
          class="input input-bordered w-full max-w-md px-3 py-2 focus:outline-none focus:shadow-outline"
        >
        </input>
        {errors.email?.message && <p>{errors.email?.message}</p>}
      </div>
      <div class="mb-4">
        <label
          for="preferredMethod"
          class="block text-sm font-bold text-neutral mb-2"
        >
          Preferred Method
        </label>
        <input
        id="preferredMethod"
          {...register("preferredMethod")}
          class="input input-bordered w-full max-w-md px-3 py-2 focus:outline-none focus:shadow-outline"
        >
        </input>
      </div>
      <div class="mb-4">
        <label
          for="preferredMethodHandle"
          class="block text-sm font-bold text-neutral mb-2"
        >
          Preferred Method Handle
        </label>
        <input
        id="preferredMethodHandle"
          {...register("preferredMethodHandle")}
          class="input input-bordered w-full max-w-md px-3 py-2 focus:outline-none focus:shadow-outline"
        >
        </input>
      </div>
      <Divider textInsert="Contact Objectives" />
      <div class="mb-4">
        <label
          for="period"
          class="block text-sm font-bold text-neutral mb-2"
        >
          Period
        </label>
        <select
          id="period"
          {...register("period")}
          class="select w-full select-bordered select-warning w=full"
        >
          <option selected disabled></option>
          <option>Weekly</option>
          <option>Biweekly</option>
          <option>Monthly</option>
          <option>Quarterly</option>
        </select>
      </div>
      <p class="text-neutral mb-2">Birthday</p>
      <div class="mb-4 flex">
        <div class="pr-2">
          <label
            for="birthdayDay"
            class="block text-sm text-neutral font-bold mb-2"
          >
            Day
          </label>
          <select 
            id="birthdayDay" 
            {...register("birthdayDay", { valueAsNumber: true })} 
            class="select select-bordered"
          >
            {Array.from({ length: 31}, (_, i) => i).map((
             i
            ) => <option value={i+1}>{i+1}</option>)}
          </select>
        </div>
        <div class="pr-2">
          <label
            for="birthdayMonth"
            class="block text-sm font-bold text-neutral mb-2"
          >
            Month
          </label>
          <select 
            id="birthdayMonth" 
            {...register("birthdayMonth", { valueAsNumber: true })}
            class="select select-bordered"
          >
            {MONTHS.map((month, i) => <option value={i + 1}>{month}</option>)}
          </select>
        </div>
        <div>
          <label
            for="birthdayYear"
            class="block text-sm font-bold text-neutral mb-2"
          >
            Year
          </label>
          <select 
            id="birthdayYear"
            {...register("birthdayYear", { valueAsNumber: true })}
            class="select select-bordered">
            {Array.from({ length: 120 }, (_, i) => 119 + get119YearsAgo() - i).map((
              year,
            ) => <option value={year}>{year}</option>)}
          </select>
        </div>
      </div>
      <div class="mb-4">
        <label
          for="connectOnBirthday"
          class="block text-sm font-bold text-neutral mb-2"
        >
          Contact on Birthday
        </label>
        <input 
          id="connectOnBirthday" 
          type="checkbox" 
          {...register("connectOnBirthday")}
          class="checkbox" 
        />
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};

export default ContactForm;
