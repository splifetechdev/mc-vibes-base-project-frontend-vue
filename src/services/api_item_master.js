import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getItemMasterByCompanyID = (id) => {
  return httpClient.get(server.ITEMMASTER + `/${id}`);
};

export const getItemMasterByID = (id, u_define_id) => {
  return httpClient.get(server.ITEMMASTER + `/getAllByID/${id}/${u_define_id}`);
};

export const getItemMasterByDepartment= (id) => {
  return httpClient.get(server.ITEMMASTER + `/getAllByDepartment/${id}`);
};

export const getAllItemMaster = () => {
  return httpClient.get(server.ITEMMASTER + `/get/All`);
};

export const addItemMaster = (data) => {
  return httpClient.post(server.ITEMMASTER + `/`, data);
};

export const updateItemMaster = (id, data) => {
  return httpClient.put(server.ITEMMASTER + `/${id}`, data);
};

export const getItemMasterMaster = (id) => {
  return httpClient.get(server.ITEMMASTER + `/${id}`);
};

export const getAllItemMasterByCompany = (id) => {
  return httpClient.get(server.ITEMMASTER + `/get/All/${id}`);
};

export const DeleteItemMaster= (id) => {
  return httpClient.delete(server.ITEMMASTER + `/${id}`);
};

export const import_Item_Master = (data) => {
  return httpClient.post(server.ITEMMASTER + `/import_item_master`,data);
};