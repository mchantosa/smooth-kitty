import { useForm } from "react-hook-form";
import { zodResolver } from "zod-resolver";
import { contactSchema } from "@/shared/data/contact.ts";
import axios from "npm:axios";

// const schema = z.object({
//   name: z.string().min(1, { message: "Required" }),
//   age: z.number().min(10),
// });

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
      class="max-w-md mx-auto bg-white p-8 border-1 border-slate-100 rounded shadow-lg"
      // @ts-ignore TODO: fix react-hook-form types
      onSubmit={handleSubmit((d) => {
        const formData = new FormData();
        formData.append("email", d.email);
        formData.append("firstName", d.firstName);
        formData.append("lastName", d.lastName);

        axios.post("/api/contacts", formData).then((res) => {
          window.location.href = "/contacts";
        });
      })}
    >
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
          E-mail address
        </label>
        <input
          {...register("email")}
          class="w-full px-3 py-2 border-1 border-slate-300 rounded-lg focus:outline-none focus:shadow-outline"
        >
        </input>
        {errors.email?.message && <p>{errors.email?.message}</p>}
      </div>
      <div class="mb-4">
        <label for="age" class="block text-gray-700 text-sm font-bold mb-2">
          First name
        </label>
        <input
          class="w-full px-3 py-2 border-1 border-slate-300 rounded-lg focus:outline-none focus:shadow-outline"
          {...register("firstName")}
        >
        </input>
        {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
      </div>
      <div class="mb-4">
        <label for="age" class="block text-gray-700 text-sm font-bold mb-2">
          Last name
        </label>
        <input
          class="w-full px-3 py-2 border-1 border-slate-300 rounded-lg focus:outline-none focus:shadow-outline"
          {...register("lastName")}
        >
        </input>
        {errors.lastName?.message && <p>{errors.lastName?.message}</p>}
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};
export default ContactForm;
