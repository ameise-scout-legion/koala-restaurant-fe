import { notification } from "antd";
import axiosClient from "./axiosClient";
import { LocationPayload } from "../types/locationType";

export const getAllLocation = async () => {
  try {
    const response = await axiosClient.get(`/location`);

    return response;
  } catch (error) {
    return error;
  }
};
export const createLocation = async (payload: LocationPayload) => {
  try {
    const response = await axiosClient.post("/location", payload);

    return response;
  } catch (error: any) {
    notification.error({
      message: error?.response.data.error,
    });
  }
};
export const deleteLocation = async (id: number) => {
  try {
    const response = await axiosClient.delete(`/location/${id}`);

    return response;
  } catch (error: any) {
    notification.error({
      message: error?.response.data.error,
    });
  }
};
export const updateLocation = async (id: number, payload: LocationPayload) => {
  try {
    const response = await axiosClient.patch(
      `/location/${id}`,
      payload
    );

    return response;
  } catch (error: any) {
    notification.error({
      message: error?.response.data.error,
    });
  }
};