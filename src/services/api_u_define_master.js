import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getu_define_master = (id) => {
  return httpClient.get(server.U_DEFINE_MASTER + `/`);
};

export const getu_define_masterByID = (id) => {
  return httpClient.get(server.U_DEFINE_MASTER + `/getAllByID/${id}`);
};

export const getu_define_masterByDepartment = (id) => {
  return httpClient.get(server.U_DEFINE_MASTER + `/getAllByDepartment/${id}`);
};

export const getAllu_define_master = () => {
  return httpClient.get(server.U_DEFINE_MASTER + `/get/All`);
};

export const addu_define_master = (data) => {
  return httpClient.post(server.U_DEFINE_MASTER + `/`, data);
};

export const updateu_define_master = (id, data) => {
  return httpClient.put(server.U_DEFINE_MASTER + `/${id}`, data);
};

export const updateu_define_masterBYmoduleid = (id, data) => {
  return httpClient.put(
    server.U_DEFINE_MASTER + `/updateBymodulemasterid/${id}`,
    data
  );
};

export const updateByModuleMasterIdANDUdefineModuleId = (
  module_master_id,
  u_define_module_id,
  data
) => {
  return httpClient.put(
    server.U_DEFINE_MASTER +
      `/updateByModuleMasterIdANDUdefineModuleId/${module_master_id}/${u_define_module_id}`,
    data
  );
};

export const getu_define_masterMaster = (id) => {
  return httpClient.get(server.U_DEFINE_MASTER + `/${id}`);
};

export const getAllu_define_masterByCompany = (id) => {
  return httpClient.get(server.U_DEFINE_MASTER + `/get/All/${id}`);
};

export const Deleteu_define_master = (id) => {
  return httpClient.delete(server.U_DEFINE_MASTER + `/${id}`);
};
