import axiosClient from "./axiosClient";

export const getAllLocation = async () => {
  try {
    const response = await axiosClient.get(`/location`);

    return response;
  } catch (error) {
    return error;
  }
};
