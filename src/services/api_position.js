import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getAllPosition = () => {
  return httpClient.get(server.POSITION + `/get/list`);
};

export const addPosition = (data) => {
  return httpClient.post(server.POSITION + `/add`, data);
};

export const updatePosition = (id, data) => {
  return httpClient.put(server.POSITION + `/update/${id}`, data);
};

export const getPositionMaster = (id) => {
  return httpClient.get(server.MASTER_POSITION + `/${id}`);
};
