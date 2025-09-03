import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getDownTimeCauseCompanyID = (id) => {
  return httpClient.get(server.DOWNTIME_CAUSE + `/${id}`);
};

export const getDownTimeCauseByID = (id, u_define_id) => {
  return httpClient.get(
    server.DOWNTIME_CAUSE + `/getAllByID/${id}/${u_define_id}`
  );
};

export const getAllDownTimeCause = () => {
  return httpClient.get(server.DOWNTIME_CAUSE + `/get/All`);
};

export const addDownTimeCause = (data) => {
  return httpClient.post(server.DOWNTIME_CAUSE + `/`, data);
};

export const updateDownTimeCause = (id, data) => {
  return httpClient.put(server.DOWNTIME_CAUSE + `/${id}`, data);
};

export const getDownTimeCauseMaster = (id) => {
  return httpClient.get(server.DOWNTIME_CAUSE + `/${id}`);
};

export const getAllDownTimeCauseCompany = (id) => {
  return httpClient.get(server.DOWNTIME_CAUSE + `/get/All/${id}`);
};

export const DeleteDownTimeCause = (id) => {
  return httpClient.delete(server.DOWNTIME_CAUSE + `/${id}`);
};

export const import_DownTime_Cause = (data) => {
  return httpClient.post(server.DOWNTIME_CAUSE + `/import_downtime_cause`,data);
};
