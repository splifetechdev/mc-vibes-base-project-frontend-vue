import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getShiftOT = () => {
  return httpClient.get(server.SHIFT_OT + `/get`);
};

export const getShiftOTByShiftID = (shift_id) => {
  return httpClient.get(server.SHIFT_OT + `/getShiftOTByShiftID/${shift_id}`);
};

export const updateShiftOT = (id, data) => {
  return httpClient.put(server.SHIFT_OT + `/${id}`, data);
};

export const addShiftOT = (data) => {
  return httpClient.post(server.SHIFT_OT, data);
};

export const deleteShiftOT = (id) => {
  return httpClient.delete(server.SHIFT_OT + `/${id}`);
};
