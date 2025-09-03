import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getGroupItemByCompanyID = (id) => {
  return httpClient.get(server.MASTER_GROUP_ITEM + `/${id}`);
};

export const getGroupItemByID = (id) => {
  return httpClient.get(server.MASTER_GROUP_ITEM + `/getAllByID/${id}`);
};

export const getAllGroupItem = () => {
  return httpClient.get(server.MASTER_GROUP_ITEM + `/get/All`);
};

export const addGroupItem = (data) => {
  return httpClient.post(server.MASTER_GROUP_ITEM + `/`, data);
};

export const updateGroupItem = (id, data) => {
  return httpClient.put(server.MASTER_GROUP_ITEM + `//${id}`, data);
};

export const getGroupItemMaster = (id) => {
  return httpClient.get(server.MASTER_GROUP_ITEM + `/${id}`);
};

export const getAllGroupItemByCompany = (id) => {
  return httpClient.get(server.MASTER_GROUP_ITEM + `/get/All/${id}`);
};

export const DeleteGroupItem = (id) => {
  return httpClient.delete(server.MASTER_GROUP_ITEM + `/${id}`);
};
