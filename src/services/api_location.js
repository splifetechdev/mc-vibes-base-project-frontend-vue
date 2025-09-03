import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getAllLocation = () => {
  return httpClient.get(server.MASTER_LOCATION + `/getAll`);
};

export const addLocation = (data) => {
  return httpClient.post(server.MASTER_LOCATION + `/`, data);
};

export const updateLocation = (id, data) => {
  return httpClient.put(server.MASTER_LOCATION + `/${id}`, data);
};

export const getLocationMaster = (id) => {
  return httpClient.get(server.MASTER_LOCATION + `/${id}`);
};

export const deleteLocation = (id) => {
  return httpClient.delete(server.MASTER_LOCATION + `/${id}`);
};
