import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getReportAllByCompanyID = (id) => {
  return httpClient.get(server.REPORT_ALL + `/${id}`);
};

export const getReportAllByID = (id) => {
  return httpClient.get(server.REPORT_ALL + `/getAllByID/${id}`);
};

export const getAllReportAll = () => {
  return httpClient.get(server.REPORT_ALL + `/get/All`);
};

export const addReportAll = (data) => {
  return httpClient.post(server.REPORT_ALL + `/`, data);
};

export const updateReportAll = (id, data) => {
  return httpClient.put(server.REPORT_ALL + `//${id}`, data);
};

export const getReportAllMaster = (id) => {
  return httpClient.get(server.REPORT_ALL + `/${id}`);
};

export const getAllReportAllByCompany = (id) => {
  return httpClient.get(server.REPORT_ALL + `/get/All/${id}`);
};

export const DeleteReportAll = (id) => {
  return httpClient.delete(server.REPORT_ALL + `/${id}`);
};


export const Getcloth_registration_mch = (data) => {
  return httpClient.post(server.REPORT_ALL + `/cloth_registration_mch`, data);
};

export const Getcloth_registration_sum = (data) => {
  return httpClient.post(server.REPORT_ALL + `/cloth_registration_sum`, data);
};

export const Getcloth_registration_detail = (data) => {
  return httpClient.post(server.REPORT_ALL + `/cloth_registration_detail`, data);
};