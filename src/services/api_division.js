import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getDivisionByCompanyID = (id) => {
  return httpClient.get(server.DIVISION + `/${id}`);
};

export const getDivisionByID = (id) => {
  return httpClient.get(server.DIVISION + `/getAllByID/${id}`);
};

export const getDivisionByDepartment= (id) => {
  return httpClient.get(server.DIVISION + `/getAllByDepartment/${id}`);
};

export const getAllDivision = () => {
  return httpClient.get(server.DIVISION + `/get/All`);
};

export const addDivision = (data) => {
  return httpClient.post(server.DIVISION + `/`, data);
};

export const updateDivision = (id, data) => {
  return httpClient.put(server.DIVISION + `/${id}`, data);
};

export const getDivisionMaster = (id) => {
  return httpClient.get(server.DIVISION + `/${id}`);
};

export const getAllDivisionByCompany = (id) => {
  return httpClient.get(server.DIVISION + `/get/All/${id}`);
};

export const DeleteDivision= (id) => {
  return httpClient.delete(server.DIVISION + `/${id}`);
};