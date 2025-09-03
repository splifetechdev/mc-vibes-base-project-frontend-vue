import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const createProdOrderPlanDraft = (data) => {
  return httpClient.post(`${server.PRODUCTION_ORDER_DRAFT}`, data);
};

export const getProdOrderPlanDraftByID = (
  doc_running,
  rtg_id,
  item_master_id
) => {
  return httpClient.get(
    `${server.PRODUCTION_ORDER_DRAFT}/getProdOrderPlanByID/${doc_running}/${rtg_id}/${item_master_id}`
  );
};

//"/getDataCheckBatchForAddNewOPN/:doc_running_no/:rtg_id/:item_master_id/:opn_id/:batch_count",
export const getDataCheckBatchForAddNewOPN = (
  doc_running_no,
  rtg_id,
  item_master_id,
  opn_id,
  batch_count
) => {
  return httpClient.get(
    `${server.PRODUCTION_ORDER_DRAFT}/getDataCheckBatchForAddNewOPN/${doc_running_no}/${rtg_id}/${item_master_id}/${opn_id}/${batch_count}`
  );
};

export const getProdOrderByMachine = (company_id, machine_id) => {
  return httpClient.get(
    `${server.PRODUCTION_ORDER_DRAFT}/getProdOrderByMachine/${company_id}/${machine_id}`
  );
};

export const getProdOrderPlanDraftList = (company_id) => {
  return httpClient.get(
    `${server.PRODUCTION_ORDER_DRAFT}/getListByCompany/${company_id}`
  );
};

export const closeWorkOrder = (doc_running_no, data) => {
  return httpClient.put(
    `${server.PRODUCTION_ORDER_DRAFT}/closeWorkOrder/${doc_running_no}`,
    data
  );
};

export const approveWorkOrder = (doc_running_no, data) => {
  return httpClient.put(
    `${server.PRODUCTION_ORDER_DRAFT}/approveWorkOrder/${doc_running_no}`,
    data
  );
};

export const deleteByOpnOrdId = (id, force = true) =>
  httpClient.delete(`${server.PRODUCTION_ORDER_DRAFT}/${id}?force=${force}`);

export const deleteOPNById = (id) =>
  httpClient.delete(`${server.PRODUCTION_ORDER_DRAFT}/deleteOPNById/${id}`);
