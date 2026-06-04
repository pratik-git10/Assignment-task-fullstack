import axiosApi from "./axios";

export const getStores = async (params) => {
  const res = await axiosApi.get("/stores", {
    params,
  });

  return res.data;
};

export const submitRating = async (data) => {
  const res = await axiosApi.post("/ratings", data);

  return res.data;
};

export const updateRating = async (storeId, data) => {
  const res = await axiosApi.put(`/ratings/${storeId}`, data);

  return res.data;
};
