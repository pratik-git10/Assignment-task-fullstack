import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../api/authApi";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";
import { registerSchema } from "../../utils/authValidationSchema";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { setUser } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);

      setUser(response.user);

      toast.success("Register successful");

      switch (response.user.role) {
        case "ADMIN":
          navigate("/admin/dashboard");
          break;

        case "STORE_OWNER":
          navigate("/owner/dashboard");
          break;

        default:
          navigate("/stores");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          {...register("name")}
          placeholder="Name"
          className="w-full border p-2 mb-2"
        />

        <p className="text-red-500 text-sm">{errors.name?.message}</p>
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border p-2 mb-2"
        />

        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <input
          {...register("address")}
          placeholder="Address"
          className="w-full border p-2 mb-2"
        />

        <p className="text-red-500 text-sm">{errors.address?.message}</p>

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full border p-2 mb-2"
        />

        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        <button className="w-full bg-black text-white p-2 rounded">
          Register
        </button>

        <Link to="/" className="block mt-3">
          Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
