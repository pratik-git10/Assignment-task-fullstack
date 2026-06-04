import axiosApi from "./axios";

export const getDashboardStats = async () => {
  const res = await axiosApi.get("/admin/dashboard");

  return res.data;
};

export const getUsers = async (params) => {
  const res = await axiosApi.get("/admin/users", {
    params,
  });

  return res.data;
};

export const getUserDetails = async (id) => {
  const res = await axiosApi.get(`/admin/users/${id}`);

  return res.data;
};

export const createUser = async (data) => {
  const res = await axiosApi.post("/admin/users", data);

  return res.data;
};

export const getStores = async (params) => {
  const res = await axiosApi.get("/admin/stores", {
    params,
  });

  return res.data;
};

export const createStore = async (data) => {
  const res = await axiosApi.post("/admin/stores", data);

  return res.data;
};
