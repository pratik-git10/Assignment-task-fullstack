import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createStore, getUsers } from "../../api/adminApi";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStoreSchema } from "../../utils/authValidationSchema";

const CreateStore = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createStoreSchema), // 🛡️ Enforce store layout limits
  });
  const [owners, setOwners] = useState([]);
  const [loadingOwners, setLoadingOwners] = useState(true);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await getUsers({ role: "STORE_OWNER", limit: 100 });
        if (response.success) {
          setOwners(response.users);
        }
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
        toast.success("Store successfully established and mapped!");
        reset();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create store");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto my-20 rounded shadow-md border">
      <h2 className="text-xl font-bold mb-4">Register New Retail Store</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("name", { required: "Store name is required" })}
            placeholder="Store Business Name"
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
        </div>

        <div>
          <input
            type="email"
            {...register("email", { required: "Store email is required" })}
            placeholder="Contact Email Address"
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
        </div>

        <div>
          <input
            {...register("address", { required: "Store location is required" })}
            placeholder="Complete Store Address"
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-xs mt-1">{errors.address?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assign Store Owner
          </label>
          <select
            {...register("ownerId", { required: "Please select an owner" })}
            className="w-full border p-2 rounded  "
            disabled={loadingOwners}>
            <option className="bg-black" value="">
              -- Select an Owner --
            </option>
            {owners.map((owner) => (
              <option className="bg-black" key={owner.id} value={owner.id}>
                {owner.name} ({owner.email})
              </option>
            ))}
          </select>
          <p className="text-red-500 text-xs mt-1">{errors.ownerId?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded font-medium hover:bg-gray-800 transition">
          Provision Business Entity
        </button>
      </form>
    </div>
  );
};

export default CreateStore;
