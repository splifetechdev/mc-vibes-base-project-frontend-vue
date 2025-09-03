import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getOrderByCompanyID = (id) => {
  return httpClient.get(server.ORDER + `/${id}`);
};

export const getOrderByQuery = (id, data) => {
  return httpClient.post(server.ORDER + `/getOrderByQuery/${id}`, data);
};

export const getAllOrderByOrdID = (id) => {
  return httpClient.get(server.ORDER + `/getAllByOrdId/${id}`);
};

export const getOrderByDocRunningID = (doc_running, id) => {
  return httpClient.get(
    server.ORDER + `/findIdByDocRunning/${doc_running}/${id}`
  );
};

export const getOrderAdjustPlanDraftByDocRunningID = (doc_running) => {
  return httpClient.get(
    server.ORDER + `/findAdjustPlanDraftByDocRunning/${doc_running}`
  );
};

export const getOrderByID = (id, u_define_id) => {
  return httpClient.get(server.ORDER + `/getAllByID/${id}/${u_define_id}`);
};

export const addOrder = (data) => {
  return httpClient.post(server.ORDER + `/`, data);
};

export const updateOrder = (id, data) => {
  return httpClient.put(server.ORDER + `/${id}`, data);
};

export const DeleteOrder = (id) => {
  return httpClient.delete(server.ORDER + `/${id}`);
};
