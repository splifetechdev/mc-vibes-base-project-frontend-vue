import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getMenuDetail = () => {
  return httpClient.get(server.MENU_DETAIL_URL + `/get`);
};

export const getAllDetailGroupMenu = () => {
  return httpClient.get(server.MENU_DETAIL_URL + `/getalldgm`);
};

export const updateMenuDetail = (id, data) => {
  return httpClient.put(server.MENU_DETAIL_URL + `/${id}`, data);
};

export const createMenuDetail = (data) => {
  return httpClient.post(server.MENU_DETAIL_URL, data);
};

export const deleteMenuDetail = (id) => {
  return httpClient.delete(server.MENU_DETAIL_URL + `/${id}`);
};
