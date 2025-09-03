import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const saveProductionOrderDraft = (data) => {
  return httpClient.post(
    server.PRODUCTION_ORDER + `/saveProductionOrderDraft`,
    data
  );
};

export const updateProductionOrderDraft = (id, data) => {
  return httpClient.put(
    server.PRODUCTION_ORDER + `/updateProductionOrderDraft/${id}`,
    data
  );
};

export const adjustProductionOrderByDueDateDraft = (id, data) => {
  return httpClient.post(
    server.PRODUCTION_ORDER + `/adjustProductionOrderByDueDateDraft/${id}`,
    data
  );
};

export const adjustProductionOrderByStartDateDraft = (id, data) => {
  return httpClient.post(
    server.PRODUCTION_ORDER + `/adjustProductionOrderByStartDateDraft/${id}`,
    data
  );
};

export const adjustProductionOrderConfirm = (doc_running, data) => {
  return httpClient.post(
    server.PRODUCTION_ORDER + `/adjustProductionOrderConfirm/${doc_running}`,
    data
  );
};

export const adjustPOChangeMchAllOPN = (id, data) => {
  return httpClient.post(
    server.PRODUCTION_ORDER + `/adjustPOChangeMchAllOPN/${id}`,
    data
  );
};

export const adjustAdjustBetweenConfirm = (doc_running, data) => {
  return httpClient.post(
    server.PRODUCTION_ORDER + `/adjustAdjustBetweenConfirm/${doc_running}`,
    data
  );
};

export const productionStatusReport = (data) => {
  return httpClient.post(
    server.PRODUCTION_ORDER + `/productionstatusreport`,
    data
  );
};

export const getMachineOpnByShift = (machineId, shiftId) => {
  return httpClient.get(`${server.PRODUCTION_ORDER}/machine/${machineId}`);
};

export const putUpdateDockRunningNo = (doc_running, data) => {
  return httpClient.put(
    server.PRODUCTION_ORDER + `/putUpdateDockRunningNo/${doc_running}`,
    data
  );
};

export const updateTblOrd = (id, data) => {
  return httpClient.put(server.PRODUCTION_ORDER + `/updateTblOrd/${id}`, data);
};
