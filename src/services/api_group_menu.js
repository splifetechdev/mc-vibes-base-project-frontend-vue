import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getGroupMenu = () => {
  return httpClient.get(server.GROUP_MENU_URL + `/get`);
};

export const updateGroupMenu = (id, data) => {
  return httpClient.put(server.GROUP_MENU_URL + `/${id}`, data);
};

export const createGroupMenu = (data) => {
  return httpClient.post(server.GROUP_MENU_URL, data);
};

export const deleteGroupMenu = (id) => {
  return httpClient.delete(server.GROUP_MENU_URL + `/${id}`);
};
