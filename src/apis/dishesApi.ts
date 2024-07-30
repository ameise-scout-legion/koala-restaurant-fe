import { notification } from "antd";
import axiosClient from "./axiosClient";

export const getAllDishes = async () => {
  try {
    const response = await axiosClient.get(`/dishes`);

    return response;
  } catch (error) {
    return error;
  }
};
export const createDishes = async (payload: any) => {
  try {
    const response = await axiosClient.post("/dishes", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error: any) {
    notification.error({
      message: error?.response.data.error,
    });
  }
};
export const deleteDishes = async (id: number) => {
  try {
    const response = await axiosClient.delete(`/dishes/${id}`);

    return response;
  } catch (error: any) {
    notification.error({
      message: error?.response.data.error,
    });
  }
};
export const updateDishes = async (id: number, payload: any) => {
  try {
    const response = await axiosClient.patch(`/dishes/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error: any) {
    notification.error({
      message: error?.response.data.error,
    });
  }
};
