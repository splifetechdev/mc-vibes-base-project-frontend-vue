import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getSettingMenuDetail = () => {
  return httpClient.get(server.SETTING_MENU_DETAIL_URL + `/get`);
};

export const getSMD_ById = (sgm_id) => {
  return httpClient.get(
    server.SETTING_MENU_DETAIL_URL + `/getcountbyid/${sgm_id}`
  );
};

export const getListMenuDetailById = (sgm_id) => {
  return httpClient.get(
    server.SETTING_MENU_DETAIL_URL + `/getlismenudetailbyid/${sgm_id}`
  );
};

export const updateSettingMenuDetail = (id, data) => {
  return httpClient.put(server.SETTING_MENU_DETAIL_URL + `/${id}`, data);
};

export const createSettingMenuDetail = (data) => {
  return httpClient.post(server.SETTING_MENU_DETAIL_URL, data);
};

export const deleteSettingMenuDetail = (id) => {
  return httpClient.delete(server.SETTING_MENU_DETAIL_URL + `/${id}`);
};

export const deleteMenuCacheSettingGroupMenu = () => {
  return httpClient.get(server.SETTING_GROUP_MENU_URL + `/deleteMenuCache`);
};
