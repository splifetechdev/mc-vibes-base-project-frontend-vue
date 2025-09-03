import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getRoutingByCompanyID = (id) => {
  return httpClient.get(server.ROUTING + `/${id}`);
};

export const getRoutingWorkOrder = (item_master_id, company_id) => {
  return httpClient.get(
    server.ROUTING + `/getRoutingWorkOrder/${item_master_id}/${company_id}`
  );
};

export const getRoutinggetAllgroupByCompanyID = (id) => {
  return httpClient.get(server.ROUTING + `/findAllgroupby/${id}`);
};

export const getRoutingByID = (id, u_define_id) => {
  return httpClient.get(server.ROUTING + `/getAllByID/${id}/${u_define_id}`);
};

export const getRoutingSearchByitem_rtg = (data) => {
  return httpClient.post(server.ROUTING + `/searchbyitem_rtg`, data);
};

export const addRouting = (data) => {
  return httpClient.post(server.ROUTING + `/`, data);
};

export const updateRouting = (id, data) => {
  return httpClient.put(server.ROUTING + `/${id}`, data);
};

export const DeleteRouting = (id, u_define_module_id) => {
  return httpClient.delete(server.ROUTING + `/${id}/${u_define_module_id}`);
};


export const getRoutingItemhavestdCost = (item_master_id, company_id) => {
  return httpClient.get(
    server.ROUTING + `/getItemhavestd_cost/${item_master_id}/${company_id}`
  );
};


export const import_Routing = (data) => {
  return httpClient.post(server.ROUTING + `/import_routing`,data);
};