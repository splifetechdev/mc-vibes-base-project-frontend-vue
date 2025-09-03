import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getWorkCenterCompanyID = (id) => {
  return httpClient.get(server.WORK_CENTER + `/${id}`);
};

export const getWorkCenterByID = (id, u_define_id) => {
  return httpClient.get(
    server.WORK_CENTER + `/getAllByID/${id}/${u_define_id}`
  );
};

export const getAllWorkCenter = () => {
  return httpClient.get(server.WORK_CENTER + `/get/All`);
};

export const addWorkCenter = (data) => {
  return httpClient.post(server.WORK_CENTER + `/`, data);
};

export const updateWorkCenter = (id, data) => {
  return httpClient.put(server.WORK_CENTER + `/${id}`, data);
};

export const getWorkCenterMaster = (id) => {
  return httpClient.get(server.WORK_CENTER + `/${id}`);
};

export const getWorkCenterAndName = (id) => {
  return httpClient.get(server.WORK_CENTER + `/getWorkCenterAndName/${id}`);
};

export const getbyWorkcentergroup = (wc_group) => {
  return httpClient.get(server.WORK_CENTER + `/getbyWorkcentergroup/${wc_group}`);
};

export const getAllWorkCenterCompany = (id) => {
  return httpClient.get(server.WORK_CENTER + `/get/All/${id}`);
};

export const DeleteWorkCenter = (id) => {
  return httpClient.delete(server.WORK_CENTER + `/${id}`);
};

export const getWorkCenterGanttchartCompanyID = (id,data) => {
  return httpClient.post(server.WORK_CENTER + `/wcganttchart/${id}`,data);
};

export const import_Work_Center = (data) => {
  return httpClient.post(server.WORK_CENTER + `/import_work_center`,data);
};