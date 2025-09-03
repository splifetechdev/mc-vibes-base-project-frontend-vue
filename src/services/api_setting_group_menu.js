import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getSettingGroupMenu = () => {
  return httpClient.get(server.SETTING_GROUP_MENU_URL + `/get`);
};

export const updateSettingGroupMenu = (id, data) => {
  return httpClient.put(server.SETTING_GROUP_MENU_URL + `/${id}`, data);
};

export const createSettingGroupMenu = (data) => {
  return httpClient.post(server.SETTING_GROUP_MENU_URL, data);
};

export const deleteSettingGroupMenu = (id) => {
  return httpClient.delete(server.SETTING_GROUP_MENU_URL + `/${id}`);
};
