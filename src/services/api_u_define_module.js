import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getu_define_module = (id) => {
  return httpClient.get(server.U_DEFINE_MODULE + `/`);
};

export const getu_define_moduleByID = (id) => {
  return httpClient.get(server.U_DEFINE_MODULE + `/getAllByID/${id}`);
};

export const getu_define_moduleByCompany = (id) => {
  return httpClient.get(server.U_DEFINE_MODULE + `/getAllByCompany/${id}`);
};

export const getu_define_module_UdefineIDByCompanyAndModuleName = (
  module_name,
  company_id
) => {
  return httpClient.get(
    server.U_DEFINE_MODULE +
      `/getUdefineIDByCompanyAndModuleName/${module_name}/${company_id}`
  );
};

export const getAllu_define_module = () => {
  return httpClient.get(server.U_DEFINE_MODULE + `/get/All`);
};

export const addu_define_module = (data) => {
  return httpClient.post(server.U_DEFINE_MODULE + `/`, data);
};

export const updateu_define_module = (id, data) => {
  return httpClient.put(server.U_DEFINE_MODULE + `/${id}`, data);
};

export const updateu_define_moduleBYmoduleid = (id, data) => {
  return httpClient.put(
    server.U_DEFINE_MODULE + `/updateBymodulemasterid/${id}`,
    data
  );
};

export const getu_define_moduleMaster = (id) => {
  return httpClient.get(server.U_DEFINE_MODULE + `/${id}`);
};

export const getAllu_define_moduleByCompany = (id) => {
  return httpClient.get(server.U_DEFINE_MODULE + `/get/All/${id}`);
};

export const Deleteu_define_module = (id) => {
  return httpClient.delete(server.U_DEFINE_MODULE + `/${id}`);
};
