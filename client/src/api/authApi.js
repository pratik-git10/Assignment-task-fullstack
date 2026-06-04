import axiosApi from "./axios";

export const loginUser = async (data) => {
  const response = await axiosApi.post("/auth/login", data);

  return response.data;
};

export const registerUser = async (data) => {
  const response = await axiosApi.post("/auth/register", data);

  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosApi.post("/auth/logout");

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosApi.get("/auth/me");

  return response.data;
};
