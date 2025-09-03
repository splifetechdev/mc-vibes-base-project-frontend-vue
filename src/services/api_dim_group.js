import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getDimGroupByCompanyID = (id) => {
  return httpClient.get(server.DIM_GROUP + `/${id}`);
};

export const getDimGroupByID = (id) => {
  return httpClient.get(server.DIM_GROUP + `/getAllByID/${id}`);
};

export const getAllDimGroup = () => {
  return httpClient.get(server.DIM_GROUP + `/get/All`);
};

export const addDimGroup = (data) => {
  return httpClient.post(server.DIM_GROUP + `/`, data);
};

export const updateDimGroup = (id, data) => {
  return httpClient.put(server.DIM_GROUP + `/${id}`, data);
};

export const getDimGroupMaster = (id) => {
  return httpClient.get(server.DIM_GROUP + `/${id}`);
};

export const getAllDimGroupByCompany = (id) => {
  return httpClient.get(server.DIM_GROUP + `/get/All/${id}`);
};

export const DeleteDimGroup= (id) => {
  return httpClient.delete(server.DIM_GROUP + `/${id}`);
};