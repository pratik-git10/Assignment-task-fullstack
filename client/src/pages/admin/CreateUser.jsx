import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "../../utils/authValidationSchema";
import { createUser } from "../../api/adminApi";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { UserPlus } from "lucide-react";

const FormField = ({ label, error, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
    {label && (
      <label
        style={{
          fontSize: "13px",
          fontWeight: 500,
          color: "var(--text-secondary)",
        }}>
        {label}
      </label>
    )}
    {children}
    {error && (
      <p style={{ fontSize: "12px", color: "var(--danger)", marginTop: "2px" }}>
        {error}
      </p>
    )}
  </div>
);

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
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
    <DashboardLayout>
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "28px",
          }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "var(--accent-bg)",
              border: "1px solid var(--accent-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <UserPlus size={18} color="var(--accent)" />
          </div>
          <div>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.3px",
              }}>
              Create User
            </h1>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
              Register a new user account
            </p>
          </div>
        </div>

        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "28px",
            boxShadow: "var(--shadow-sm)",
          }}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <FormField label="Full Name" error={errors.name?.message}>
              <input {...register("name")} placeholder="Min 20 characters" />
            </FormField>

            <FormField label="Email Address" error={errors.email?.message}>
              <input
                type="email"
                {...register("email")}
                placeholder="user@example.com"
              />
            </FormField>

            <FormField label="Password" error={errors.password?.message}>
              <input
                type="password"
                {...register("password")}
                placeholder="8–16 chars, 1 uppercase, 1 special"
              />
            </FormField>

            <FormField label="Address" error={errors.address?.message}>
              <textarea
                {...register("address")}
                placeholder="Full address (max 400 chars)"
                style={{ minHeight: "90px", resize: "vertical" }}
              />
            </FormField>

            <FormField label="Role" error={errors.role?.message}>
              <select {...register("role")}>
                <option value="USER">Standard Customer (USER)</option>
                <option value="STORE_OWNER">Store Owner (STORE_OWNER)</option>
                <option value="ADMIN">System Admin (ADMIN)</option>
              </select>
            </FormField>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "11px",
                background: isSubmitting
                  ? "var(--bg-elevated)"
                  : "var(--accent)",
                border: "none",
                color: isSubmitting ? "var(--text-muted)" : "#fff",
                borderRadius: "var(--radius-sm)",
                fontSize: "14px",
                fontWeight: 600,
                transition: "all 0.15s",
                marginTop: "4px",
              }}>
              {isSubmitting ? "Creating…" : "Create User"}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateUser;
