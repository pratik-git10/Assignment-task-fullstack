import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // 💡 Import resolver
import { createUserSchema } from "../../utils/authValidationSchema";
import { createUser } from "../../api/adminApi";
import toast from "react-hot-toast";

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await createUser(data);
      if (response.success) {
        toast.success("User created successfully!");
        reset();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto my-20 rounded shadow-md border">
      <h2 className="text-xl font-bold mb-4">Create New User Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("name")}
            placeholder="Full Name (Min 20 chars)"
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
        </div>

        <div>
          <input
            type="email"
            {...register("email")}
            placeholder="Email Address"
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
        </div>

        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Password (8-16 chars, 1 Uppercase, 1 Special)"
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-xs mt-1">
            {errors.password?.message}
          </p>
        </div>

        <div>
          <textarea
            {...register("address")}
            placeholder="Physical Address (Max 400 chars)"
            className="w-full border p-2 rounded h-24"
          />
          <p className="text-red-500 text-xs mt-1">{errors.address?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            System Authorization Role
          </label>
          <select {...register("role")} className="w-full border p-2 rounded">
            <option className="bg-black" value="USER">
              Standard Customer (USER)
            </option>
            <option className="bg-black" value="STORE_OWNER">
              Store Owner (STORE_OWNER)
            </option>
            <option className="bg-black" value="ADMIN">
              System Admin (ADMIN)
            </option>
          </select>
          <p className="text-red-500 text-xs mt-1">{errors.role?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded font-medium hover:bg-gray-800 transition">
          Register User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
