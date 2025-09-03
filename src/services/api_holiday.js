import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getHolidayCompanyID = (id) => {
  return httpClient.get(server.HOLIDAY + `/${id}`);
};

export const getHolidayByID = (id, u_define_id) => {
  return httpClient.get(server.HOLIDAY + `/getAllByID/${id}/${u_define_id}`);
};

export const getAllHoliday = () => {
  return httpClient.get(server.HOLIDAY + `/get/All`);
};

export const addHoliday = (data) => {
  return httpClient.post(server.HOLIDAY + `/`, data);
};

export const updateHoliday = (id, data) => {
  return httpClient.put(server.HOLIDAY + `/${id}`, data);
};

export const getHolidayMaster = (id) => {
  return httpClient.get(server.HOLIDAY + `/${id}`);
};

export const getAllHolidayCompany = (id) => {
  return httpClient.get(server.HOLIDAY + `/get/All/${id}`);
};

export const DeleteHoliday = (id) => {
  return httpClient.delete(server.HOLIDAY + `/${id}`);
};
