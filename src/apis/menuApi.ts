import { notification } from "antd";
import axiosClient from "./axiosClient";

export const getAllMenu = async (id: number) => {
  try {
    const response = await axiosClient.get(`/menu/location/${id}`);

    return response;
  } catch (error) {
    return error;
  }
};
export const createMenu = async (payload: any) => {
  try {
    const response = await axiosClient.post("/menu", payload);

    return response;
  } catch (error: any) {
    notification.error({
      message: error?.response.data.error,
    });
  }
};
export const deleteMenu = async (id: number) => {
  try {
    const response = await axiosClient.delete(`/menu/${id}`);

    return response;
  } catch (error: any) {
    notification.error({
      message: error?.response.data.error,
    });
  }
};
export const updateMenu = async (id: number, payload: any) => {
  try {
    const response = await axiosClient.patch(
      `/menu/${id}`,
      payload
    );

    return response;
  } catch (error: any) {
    notification.error({
      message: error?.response.data.error,
    });
  }
};