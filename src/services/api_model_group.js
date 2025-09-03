import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getModelGroupByCompanyID = (id) => {
  return httpClient.get(server.MODEL_GROUP + `/${id}`);
};

export const getModelGroupByID = (id) => {
  return httpClient.get(server.MODEL_GROUP + `/getAllByID/${id}`);
};

export const getAllModelGroup = () => {
  return httpClient.get(server.MODEL_GROUP + `/get/All`);
};

export const addModelGroup = (data) => {
  return httpClient.post(server.MODEL_GROUP + `/`, data);
};

export const updateModelGroup = (id, data) => {
  return httpClient.put(server.MODEL_GROUP + `/${id}`, data);
};

export const getModelGroupMaster = (id) => {
  return httpClient.get(server.MODEL_GROUP + `/${id}`);
};

export const getAllModelGroupByCompany = (id) => {
  return httpClient.get(server.MODEL_GROUP + `/get/All/${id}`);
};

export const DeleteModelGroup= (id) => {
  return httpClient.delete(server.MODEL_GROUP + `/${id}`);
};