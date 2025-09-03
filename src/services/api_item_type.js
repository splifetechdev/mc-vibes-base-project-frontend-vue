import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getItemTypeByCompanyID = (id) => {
  return httpClient.get(server.ITEM_TYPE + `/${id}`);
};

export const getItemTypeByID = (id) => {
  return httpClient.get(server.ITEM_TYPE + `/getAllByID/${id}`);
};

export const getAllItemType = () => {
  return httpClient.get(server.ITEM_TYPE + `/get/All`);
};

export const addItemType = (data) => {
  return httpClient.post(server.ITEM_TYPE + `/`, data);
};

export const updateItemType = (id, data) => {
  return httpClient.put(server.ITEM_TYPE + `/${id}`, data);
};

export const getItemTypeMaster = (id) => {
  return httpClient.get(server.ITEM_TYPE + `/${id}`);
};

export const getAllItemTypeByCompany = (id) => {
  return httpClient.get(server.ITEM_TYPE + `/get/All/${id}`);
};

export const DeleteItemType= (id) => {
  return httpClient.delete(server.ITEM_TYPE + `/${id}`);
};