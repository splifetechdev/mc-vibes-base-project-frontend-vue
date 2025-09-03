import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getAllCompany = () => {
  return httpClient.get(server.MASTER_COMPANY + `/getAll`);
};

export const addCompany = (data) => {
  return httpClient.post(server.MASTER_COMPANY + `/`, data);
};

export const updateCompany = (id, data) => {
  return httpClient.put(server.MASTER_COMPANY + `/${id}`, data);
};

export const getCompanyMaster = (id) => {
  return httpClient.get(server.MASTER_COMPANY + `/${id}`);
};
