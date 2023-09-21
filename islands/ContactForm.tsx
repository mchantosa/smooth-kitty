import { useForm } from "react-hook-form";
import { zodResolver } from "zod-resolver";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  age: z.number().min(10),
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form
      class="max-w-md mx-auto bg-white p-8 border-1 border-slate-100 rounded shadow-lg"
      // @ts-ignore TODO: fix react-hook-form types
      onSubmit={handleSubmit((d) => console.log(d))}
    >
      <div class="mb-4">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          {...register("name")}
          class="w-full px-3 py-2 border-1 border-slate-300 rounded-lg focus:outline-none focus:shadow-outline"
        >
        </input>
        {errors.name?.message && <p>{errors.name?.message}</p>}
      </div>
      <div class="mb-4">
        <label for="age" class="block text-gray-700 text-sm font-bold mb-2">
          Age
        </label>
        <input
          type="number"
          class="w-full px-3 py-2 border-1 border-slate-300 rounded-lg focus:outline-none focus:shadow-outline"
          {...register("age", { valueAsNumber: true })}
        >
        </input>
        {errors.age?.message && <p>{errors.age?.message}</p>}
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};
export default ContactForm;
