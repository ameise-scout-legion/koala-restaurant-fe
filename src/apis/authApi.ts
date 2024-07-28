import { notification } from "antd";
import { User } from "../types/usersType";
import axiosClient from "./axiosClient";

export const login = async (value: User) => {
  try {
    const response = await axiosClient.post(`/user/login`, value);

    return response;
  } catch (error: any) {
    notification.error({
        message: error?.response.data.message,
      })
  }
};
