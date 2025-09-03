import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getSectionByCompanyID = (id) => {
  return httpClient.get(server.SECTION + `/${id}`);
};

export const getSectionByID = (id) => {
  return httpClient.get(server.SECTION + `/getAllByID/${id}`);
};

export const getAllSection = () => {
  return httpClient.get(server.SECTION + `/get/All`);
};

export const addSection = (data) => {
  return httpClient.post(server.SECTION + `/`, data);
};

export const updateSection = (id, data) => {
  return httpClient.put(server.SECTION + `/${id}`, data);
};

export const getSectionMaster = (id) => {
  return httpClient.get(server.SECTION + `/${id}`);
};

export const getAllSectionByCompany = (id) => {
  return httpClient.get(server.SECTION + `/get/All/${id}`);
};

export const DeleteSection= (id) => {
  return httpClient.delete(server.SECTION + `/${id}`);
};