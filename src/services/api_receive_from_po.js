import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getAllReceiveFromPOllByCompanyId = (company_id) => {
  return httpClient.get(
    server.MASTER_RECEIVE_FROM_PO + `/getReceiveAllByCompanyId/${company_id}`
  );
};

export const getTimeCardReceiveAllById = (id) => {
  return httpClient.get(
    server.MASTER_RECEIVE_FROM_PO + `/getTimeCardReceiveAllById/${id}`
  );
};

export const getReceiveAllByCompanyIdAndId = (company_id, id) => {
  return httpClient.get(
    server.MASTER_RECEIVE_FROM_PO +
      `/getReceiveAllByCompanyIdAndId/${company_id}/${id}`
  );
};

export const getReceivePODocIdPrefix = () => {
  return httpClient.get(
    server.MASTER_RECEIVE_FROM_PO + `/getReceivePODocIdPrefix/All`
  );
};

export const getAllReceiveFromPO = () => {
  return httpClient.get(server.MASTER_RECEIVE_FROM_PO + `/getAll`);
};

export const addReceiveFromPO = (data) => {
  return httpClient.post(server.MASTER_RECEIVE_FROM_PO + `/`, data);
};

export const saveReceiveFromPO = (data) => {
  return httpClient.post(
    server.MASTER_RECEIVE_FROM_PO + `/saveReceivePO`,
    data
  );
};

export const updateReceiveFromPO = (id, data) => {
  return httpClient.put(server.MASTER_RECEIVE_FROM_PO + `/${id}`, data);
};

export const getReceiveFromPOMaster = (id) => {
  return httpClient.get(server.MASTER_RECEIVE_FROM_PO + `/${id}`);
};

export const deleteReceiveFromPO = (id) => {
  return httpClient.delete(server.MASTER_RECEIVE_FROM_PO + `/${id}`);
};

//  /deleteTimCardItem/:id/qty/:qty/time_card_id/:time_card_id/opn_ord_id/:opn_ord_id
export const deleteTimCardItem = (id, qty, time_card_id, opn_ord_id) => {
  return httpClient.delete(
    server.MASTER_RECEIVE_FROM_PO +
      `/deleteTimCardItem/${id}/qty/${qty}/time_card_id/${time_card_id}/opn_ord_id/${opn_ord_id}`
  );
};
