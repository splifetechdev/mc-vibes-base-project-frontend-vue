import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getUnitByCompanyID = (id) => {
  return httpClient.get(server.MASTER_UNIT + `/${id}`);
};

export const getUnitByID = (id) => {
  return httpClient.get(server.MASTER_UNIT + `/getAllByID/${id}`);
};

export const getAllUnit = () => {
  return httpClient.get(server.MASTER_UNIT + `/get/All`);
};

export const addUnit = (data) => {
  return httpClient.post(server.MASTER_UNIT + `/`, data);
};

export const updateUnit = (id, data) => {
  return httpClient.put(server.MASTER_UNIT + `//${id}`, data);
};

export const getUnitMaster = (id) => {
  return httpClient.get(server.MASTER_UNIT + `/${id}`);
};

export const getAllUnitByCompany = (id) => {
  return httpClient.get(server.MASTER_UNIT + `/get/All/${id}`);
};

export const DeleteUnit = (id) => {
  return httpClient.delete(server.MASTER_UNIT + `/${id}`);
};
