import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getWorkCenterGroupCompanyID = (id) => {
  return httpClient.get(server.WORK_CENTER_GROUP + `/${id}`);
};

export const getWorkCenterGroupByMachineId = (machine_id) => {
  return httpClient.get(
    server.WORK_CENTER_GROUP + `/getWorkCenterGroupByMachineId/${machine_id}`
  );
};

export const getWorkCenterGroupByID = (id, u_define_id) => {
  return httpClient.get(
    server.WORK_CENTER_GROUP + `/getAllByID/${id}/${u_define_id}`
  );
};

export const getAllWorkCenterGroup = () => {
  return httpClient.get(server.WORK_CENTER_GROUP + `/get/All`);
};

export const addWorkCenterGroup = (data) => {
  return httpClient.post(server.WORK_CENTER_GROUP + `/`, data);
};

export const updateWorkCenterGroup = (id, data) => {
  return httpClient.put(server.WORK_CENTER_GROUP + `/${id}`, data);
};

export const getWorkCenterGroupMaster = (id) => {
  return httpClient.get(server.WORK_CENTER_GROUP + `/${id}`);
};

export const getWorkCenterGroupAndName = (id) => {
  return httpClient.get(
    server.WORK_CENTER_GROUP + `/getWorkCenterGroupAndName/${id}`
  );
};

export const getAllWorkCenterGroupCompany = (id) => {
  return httpClient.get(server.WORK_CENTER_GROUP + `/get/All/${id}`);
};

export const DeleteWorkCenterGroup = (id) => {
  return httpClient.delete(server.WORK_CENTER_GROUP + `/${id}`);
};

export const getWorkCenterGroupGanttchartCompanyID = (id, data) => {
  return httpClient.post(
    server.WORK_CENTER_GROUP + `/wcgganttchart/${id}`,
    data
  );
};

export const import_Work_Center_Group = (data) => {
  return httpClient.post(server.WORK_CENTER_GROUP + `/import_work_center_group`,data);
};
