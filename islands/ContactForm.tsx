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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  return (
    <form
      class="max-w-md mx-auto p-8 border-1 border-neutral rounded shadow-lg"
      // @ts-ignore TODO: fix react-hook-form types
      onSubmit={handleSubmit((d) => {
        const formData = new FormData();
        formData.append("firstName", d.firstName);
        formData.append("lastName", d.lastName);
        formData.append("pronouns", d.pronouns);
        formData.append("avatarUrl", d.avatarUrl);
        formData.append("email", d.email);

        axios.post("/api/contacts", formData).then((res) => {
          window.location.href = "/contacts";
        });
      })}
    >
      <Divider textInsert="Name" />
      <div class="mb-4">
        <label
          for="firstName"
          class="block text-sm font-bold text-neutral-content mb-2"
        >
          First name
        </label>
        <input
          id="firstName"
          class="w-full px-3 py-2 border-1 border-error rounded-lg focus:outline-none focus:shadow-outline"
          {...register("firstName")}
        >
        </input>
      </div>
      <div class="mb-4">
        <label
          for="lastName"
          class="block  text-sm font-bold text-neutral-content mb-2"
        >
          Last name
        </label>
        <input
          id="lastName"
          class="w-full px-3 py-2 border-1 border-neutral rounded-lg focus:outline-none focus:shadow-outline"
          {...register("lastName")}
        >
        </input>
      </div>
      <div class="mb-4">
        <label
          for="pronouns"
          class="block  text-sm font-bold text-neutral-content mb-2"
        >
          Titles and Pronouns
        </label>
        <input
          id="pronouns"
          class="w-full px-3 py-2 border-1 border-neutral rounded-lg focus:outline-none focus:shadow-outline"
          {...register("pronouns")}
        >
        </input>
      </div>
      <div class="mb-4">
        <label
          for="avatarUrl"
          class="block  text-sm font-bold text-neutral-content mb-2"
        >
          Avatar URL
        </label>
        <input
          id="avatarUrl"
          class="w-full px-3 py-2 border-1 border-neutral rounded-lg focus:outline-none focus:shadow-outline"
          {...register("avatarUrl")}
        >
        </input>
      </div>
      <Divider textInsert="Contact Information" />
      <div class="mb-4">
        <label
          for="phone"
          class="block  text-sm font-bold text-neutral-content mb-2"
        >
          Phone
        </label>
        <input
          {...register("phone")}
          class="w-full px-3 py-2 border-1 border-neutral rounded-lg focus:outline-none focus:shadow-outline"
        >
        </input>
      </div>
      <div class="mb-4">
        <label
          for="email"
          class="block  text-sm font-bold text-neutral-content mb-2"
        >
          Email
        </label>
        <input
          {...register("email")}
          class="w-full px-3 py-2 border-1 border-neutral rounded-lg focus:outline-none focus:shadow-outline"
        >
        </input>
        {errors.email?.message && <p>{errors.email?.message}</p>}
      </div>
      <div class="mb-4">
        <label
          for="preferredMethod"
          class="block  text-sm font-bold text-neutral-content mb-2"
        >
          Preferred Method
        </label>
        <input
          {...register("preferredMethod")}
          class="w-full px-3 py-2 border-1 border-neutral rounded-lg focus:outline-none focus:shadow-outline"
        >
        </input>
      </div>
      <div class="mb-4">
        <label
          for="preferrefMethodHandle"
          class="block  text-sm font-bold text-neutral-content mb-2"
        >
          Preferred Method Handle
        </label>
        <input
          {...register("preferrefMethodHandle")}
          class="w-full px-3 py-2 border-1 border-neutral rounded-lg focus:outline-none focus:shadow-outline"
        >
        </input>
      </div>
      <Divider textInsert="Contact Objectives" />
      <div class="mb-4">
        <label
          for="period"
          class="block  text-sm font-bold text-neutral-content mb-2"
        >
          Period
        </label>
        <select
          id="period"
          className="select w-full select-bordered select-error w=full"
        >
          <option selected disabled></option>
          <option>Weekly</option>
          <option>Biweekly</option>
          <option>Monthly</option>
          <option>Quarterly</option>
        </select>
      </div>
      <p class="text-neutral-content mb-2">Birthday</p>
      <div class="mb-4 flex">
        <div class="pr-2">
          <label
            for="day"
            class="block  text-sm text-neutral-content font-bold mb-2"
          >
            Day
          </label>
          <select id="day" className="select select-bordered">
            <option selected></option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div class="pr-2">
          <label
            for="month"
            class="block  text-sm font-bold text-neutral-content mb-2"
          >
            Month
          </label>
          <select id="month" className="select select-bordered">
            <option selected></option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>
        </div>
        <div>
          <label
            for="year"
            class="block  text-sm font-bold text-neutral-content mb-2"
          >
            Year
          </label>
          <select className="select select-bordered">
            <option selected></option>
            {Array.from({ length: 120 }, (_, i) => i + get119YearsAgo()).map((
              year,
            ) => <option>{year}</option>)}
          </select>
        </div>
      </div>
      <div class="mb-4">
        <label
          for="birthdayCheck"
          class="block  text-sm font-bold text-neutral-content mb-2"
        >
          Contact on Birthday
        </label>
        <input id="birthdayCheck" type="checkbox" className="checkbox" />
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};
export default ContactForm;
