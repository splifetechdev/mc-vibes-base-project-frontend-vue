import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getHolidayMchByCompanyID = (id) => {
  return httpClient.get(server.HOLIDAY_MCH + `/${id}`);
};

export const getHolidayMchByHolidayID = (id) => {
  return httpClient.get(server.HOLIDAY_MCH + `/getHolidayMchByHolidayID/${id}`);
};

export const getHolidayMchByWcg = (wcg_id) => {
  return httpClient.get(server.HOLIDAY_MCH + `/getMchByWcg/${wcg_id}`);
};

export const getHolidayMchByID = (id, u_define_id) => {
  return httpClient.get(
    server.HOLIDAY_MCH + `/getAllByID/${id}/${u_define_id}`
  );
};

export const addHolidayMch = (data) => {
  return httpClient.post(server.HOLIDAY_MCH + `/`, data);
};

export const updateHolidayMch = (id, data) => {
  return httpClient.put(server.HOLIDAY_MCH + `/${id}`, data);
};

export const DeleteHolidayMch = (id) => {
  return httpClient.delete(server.HOLIDAY_MCH + `/${id}`);
};
