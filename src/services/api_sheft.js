import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getAllSheft = () => {
  return httpClient.get(server.MASTER_SHEFT + `/getAll`);
};

export const addSheft = (data) => {
  return httpClient.post(server.MASTER_SHEFT + `/`, data);
};

export const updateSheft = (id, data) => {
  return httpClient.put(server.MASTER_SHEFT + `/${id}`, data);
};

export const getSheftMaster = (id) => {
  return httpClient.get(server.MASTER_SHEFT + `/${id}`);
};

export const deleteSheft = (id) => {
  return httpClient.delete(server.MASTER_SHEFT + `/${id}`);
};
