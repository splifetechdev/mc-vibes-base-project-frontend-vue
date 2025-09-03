import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getKPIMasterCompanyID = (id) => {
  return httpClient.get(server.KPI_MASTER + `/${id}`);
};

export const getKPIMasterByID = (id, u_define_id) => {
  return httpClient.get(server.KPI_MASTER + `/getAllByID/${id}/${u_define_id}`);
};

export const getAllKPIMaster = () => {
  return httpClient.get(server.KPI_MASTER + `/get/All`);
};

export const addKPIMaster = (data) => {
  return httpClient.post(server.KPI_MASTER + `/`, data);
};

export const updateKPIMaster = (id, data) => {
  return httpClient.put(server.KPI_MASTER + `/${id}`, data);
};

export const getKPIMasterMaster = (id) => {
  return httpClient.get(server.KPI_MASTER + `/${id}`);
};

export const getAllKPIMasterCompany = (id) => {
  return httpClient.get(server.KPI_MASTER + `/get/All/${id}`);
};

// export const getKPIMasterList = (id, company_id) => {
//   return httpClient.get(
//     server.KPI_MASTER + `/getKPIMasterList/${id}/${company_id}`
//   );
// };

export const getKPIMasterList = (company_id) => {
  return httpClient.get(server.KPI_MASTER + `/getKPIMasterList/${company_id}`);
};

export const DeleteKPIMaster = (id) => {
  return httpClient.delete(server.KPI_MASTER + `/${id}`);
};
