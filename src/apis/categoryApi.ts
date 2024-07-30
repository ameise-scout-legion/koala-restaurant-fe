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