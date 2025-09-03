import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getKPITitleCompanyID = (id) => {
  return httpClient.get(server.KPI_TITLE + `/${id}`);
};

export const getKPITitleByID = (id, u_define_id) => {
  return httpClient.get(
    server.KPI_TITLE + `/getAllByID/${id}/${u_define_id}`
  );
};

export const getAllKPITitle = () => {
  return httpClient.get(server.KPI_TITLE + `/get/All`);
};

export const addKPITitle = (data) => {
  return httpClient.post(server.KPI_TITLE + `/`, data);
};

export const updateKPITitle = (id, data) => {
  return httpClient.put(server.KPI_TITLE + `/${id}`, data);
};

export const getKPITitleMaster = (id) => {
  return httpClient.get(server.KPI_TITLE + `/${id}`);
};

export const getAllKPITitleCompany = (id) => {
  return httpClient.get(server.KPI_TITLE + `/get/All/${id}`);
};

export const DeleteKPITitle = (id) => {
  return httpClient.delete(server.KPI_TITLE + `/${id}`);
};
