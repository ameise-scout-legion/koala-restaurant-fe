import { notification } from "antd";
import axiosClient from "./axiosClient";

export const getAllCategory = async () => {
  try {
    const response = await axiosClient.get(`/category`);

    return response;
  } catch (error) {
    return error;
  }
};
export const createCategory = async (payload: any) => {
  try {
    const response = await axiosClient.post("/category", payload);

    return response;
  } catch (error: any) {
    notification.error({
      message: error?.response.data.error,
    });
  }
};
export const deleteCategory = async (id: number) => {
  try {
    const response = await axiosClient.delete(`/category/${id}`);

    return response;
  } catch (error: any) {
    notification.error({
      message: error?.response.data.error,
    });
  }
};
export const updateCategory = async (id: number, payload: any) => {
  try {
    const response = await axiosClient.patch(
      `/category/${id}`,
      payload
    );

    return response;
  } catch (error: any) {
    notification.error({
      message: error?.response.data.error,
    });
  }
};