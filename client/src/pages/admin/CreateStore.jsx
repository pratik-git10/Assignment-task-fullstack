import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createStore, getUsers } from "../../api/adminApi";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStoreSchema } from "../../utils/authValidationSchema";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Store } from "lucide-react";

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

const CreateStore = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createStoreSchema),
  });
  const [owners, setOwners] = useState([]);
  const [loadingOwners, setLoadingOwners] = useState(true);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await getUsers({ role: "STORE_OWNER", limit: 100 });
        if (response.success) setOwners(response.users);
      } catch (error) {
        console.error("Failed to load store owners", error);
      } finally {
        setLoadingOwners(false);
      }
    };
    fetchOwners();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await createStore(data);
      if (response.success) {
        toast.success("Store created successfully!");
        reset();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create store");
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
            <Store size={18} color="var(--accent)" />
          </div>
          <div>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.3px",
              }}>
              Create Store
            </h1>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
              Register a new retail store
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
            <FormField label="Store Name" error={errors.name?.message}>
              <input {...register("name")} placeholder="Business name" />
            </FormField>

            <FormField label="Contact Email" error={errors.email?.message}>
              <input
                type="email"
                {...register("email")}
                placeholder="store@example.com"
              />
            </FormField>

            <FormField label="Store Address" error={errors.address?.message}>
              <input
                {...register("address")}
                placeholder="Complete store address"
              />
            </FormField>

            <FormField
              label="Assign Store Owner"
              error={errors.ownerId?.message}>
              <select {...register("ownerId")} disabled={loadingOwners}>
                <option value="">
                  {loadingOwners ? "Loading owners…" : "— Select an Owner —"}
                </option>
                {owners.map((owner) => (
                  <option key={owner.id} value={owner.id}>
                    {owner.name} ({owner.email})
                  </option>
                ))}
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
              {isSubmitting ? "Creating…" : "Create Store"}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateStore;
