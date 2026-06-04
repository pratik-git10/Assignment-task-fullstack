import axiosApi from "./axios";

export const getOwnerDashboard = async () => {
  const response = await axiosApi.get("/owner/dashboard");

  return response.data;
};
