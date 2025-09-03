import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getDefectCauseByCompanyID = (id) => {
  return httpClient.get(server.DEFECT_CAUSE + `/${id}`);
};

export const getDefectCauseByID = (id, u_define_id) => {
  return httpClient.get(server.DEFECT_CAUSE + `/getAllByID/${id}/${u_define_id}`);
};

export const addDefectCause = (data) => {
  return httpClient.post(server.DEFECT_CAUSE + `/`, data);
};

export const updateDefectCause = (id, data) => {
  return httpClient.put(server.DEFECT_CAUSE + `/${id}`, data);
};

export const DeleteDefectCause= (id) => {
  return httpClient.delete(server.DEFECT_CAUSE + `/${id}`);
};

export const import_Defect_Cause = (data) => {
  return httpClient.post(server.DEFECT_CAUSE + `/import_defect_cause`,data);
};
