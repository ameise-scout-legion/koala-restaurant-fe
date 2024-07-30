import { notification } from "antd";
import { UserPayload } from "../types/userType";
import axiosClient from "./axiosClient";

export const getAllUserByLocation = async (id: number | undefined) => {
  try {
    const response = await axiosClient.get(`/owner/view-user/location/${id}`);

    return response;
  } catch (error) {
    return error;
  }
};
export const createUser = async (payload: UserPayload) => {
  try {
    const response = await axiosClient.post("/owner/create-user", payload);

    return response;
  } catch (error: any) {
    notification.error({
      message: error?.response.data.error,
    });
  }
};
export const deleteUser = async (id: number) => {
  try {
    const response = await axiosClient.delete(`/owner/delete-user/${id}`);

    return response;
  } catch (error: any) {
    notification.error({
      message: error?.response.data.error,
    });
  }
};
export const updateUser = async (id: number, payload: UserPayload) => {
  try {
    const response = await axiosClient.patch(
      `/owner/update-user/${id}`,
      payload
    );

    return response;
  } catch (error: any) {
    notification.error({
      message: error?.response.data.error,
    });
  }
};
export const searchUser = async (query: string) => {
  try {
    const response = await axiosClient.post(`/owner/search/${query}`);

    return response;
  } catch (error: any) {
    notification.error({
      message: error?.response.data.error,
    });
  }
};
