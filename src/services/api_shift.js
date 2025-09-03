import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getShiftByCompanyID = (id) => {
  return httpClient.get(server.SHIFT + `/${id}`);
};

export const getShiftByID = (id,u_define_id) => {
  return httpClient.get(server.SHIFT + `/getAllByID/${id}/${u_define_id}`);
};

export const addShift = (data) => {
  return httpClient.post(server.SHIFT + `/`, data);
};

export const updateShift = (id, data) => {
  return httpClient.put(server.SHIFT + `/${id}`, data);
};

export const DeleteShift= (id) => {
  return httpClient.delete(server.SHIFT + `/${id}`);
};