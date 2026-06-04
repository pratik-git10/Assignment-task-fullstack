import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import { changePasswordSchema } from "../../utils/authValidationSchema";
import { changePassword } from "../../api/authApi";
import DashboardLayout from "../../components/layout/DashboardLayout";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      await changePassword(data);

      toast.success("Password updated successfully");

      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Change Password</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="password"
            placeholder="Current Password"
            {...register("currentPassword")}
            className="border p-2 w-full mb-2"
          />

          <p className="text-red-500 text-sm">
            {errors.currentPassword?.message}
          </p>

          <input
            type="password"
            placeholder="New Password"
            {...register("newPassword")}
            className="border p-2 w-full mb-2"
          />

          <p className="text-red-500 text-sm">{errors.newPassword?.message}</p>

          <button className="bg-black text-white px-4 py-2 rounded">
            Update Password
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ChangePassword;
