import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getAllWarehouse = () => {
  return httpClient.get(server.MASTER_WAREHOUSE + `/getAll`);
};

export const addWarehouse = (data) => {
  return httpClient.post(server.MASTER_WAREHOUSE + `/`, data);
};

export const updateWarehouse = (id, data) => {
  return httpClient.put(server.MASTER_WAREHOUSE + `/${id}`, data);
};

export const getWarehouseMaster = (id) => {
  return httpClient.get(server.MASTER_WAREHOUSE + `/${id}`);
};

export const deleteWarehouse = (id) => {
  return httpClient.delete(server.MASTER_WAREHOUSE + `/${id}`);
};
