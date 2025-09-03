import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getDepartmentByCompanyID = (id) => {
  return httpClient.get(server.MASTER_DEPARTMENT + `/${id}`);
};

export const getDepartmentByID = (id) => {
  return httpClient.get(server.MASTER_DEPARTMENT + `/getAllByID/${id}`);
};

export const getAllDepartment = () => {
  return httpClient.get(server.MASTER_DEPARTMENT + `/get/All`);
};

export const addDepartment = (data) => {
  return httpClient.post(server.MASTER_DEPARTMENT + `/`, data);
};

export const updateDepartment = (id, data) => {
  return httpClient.put(server.MASTER_DEPARTMENT + `//${id}`, data);
};

export const getDepartmentMaster = (id) => {
  return httpClient.get(server.MASTER_DEPARTMENT + `/${id}`);
};

export const getAllDepartmentByCompany = (id) => {
  return httpClient.get(server.MASTER_DEPARTMENT + `/get/All/${id}`);
};

export const DeleteDepartment= (id) => {
  return httpClient.delete(server.MASTER_DEPARTMENT + `/${id}`);
};