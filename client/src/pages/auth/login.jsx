import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../api/authApi";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";
import { loginSchema } from "../../utils/authValidationSchema";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { setUser } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      setUser(response.user);

      toast.success("Login successful");

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
          {...register("email")}
          placeholder="Email"
          className="w-full border p-2 mb-2"
        />

        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full border p-2 mb-2"
        />

        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        <button className="w-full bg-black text-white p-2 rounded">
          Login
        </button>

        <Link to="/register" className="block mt-3">
          Register
        </Link>
      </form>
    </div>
  );
};

export default Login;
