import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getPONewMachineRoutingTmp = (company_id) => {
  return httpClient.get(
    server.MASTER_ROUTING_TMP + `/getPONewMachine/${company_id}`
  );
};

export const getPONewMachineName = (company_id) => {
  return httpClient.get(
    server.MASTER_ROUTING_TMP + `/getPONewMachineName/${company_id}`
  );
};

export const getAllRoutingTmp = () => {
  return httpClient.get(server.MASTER_ROUTING_TMP + `/getAll`);
};

export const addRoutingTmp = (data) => {
  return httpClient.post(server.MASTER_ROUTING_TMP + `/`, data);
};

export const updateRoutingTmp = (id, data) => {
  return httpClient.put(server.MASTER_ROUTING_TMP + `/${id}`, data);
};

export const getRoutingTmpMaster = (id) => {
  return httpClient.get(server.MASTER_ROUTING_TMP + `/${id}`);
};

//delete
export const deleteRoutingTmp22 = (id) => {
  return httpClient.delete(server.MASTER_ROUTING_TMP + `/${id}`);
};

//saveRoutingTmpNew
export const saveRoutingTmpNew = (data) => {
  return httpClient.post(
    server.MASTER_ROUTING_TMP + `/saveRoutingTmpNew`,
    data
  );
};

//deleteRoutingTmpNew
export const deleteRoutingTmpNew = (id) => {
  return httpClient.delete(
    server.MASTER_ROUTING_TMP + `/deleteRoutingTmpNew/${id}`
  );
};

//saveRoutingTmp
export const saveRoutingTmp = (data) => {
  return httpClient.post(server.MASTER_ROUTING_TMP + `/saveRoutingTmp`, data);
};

//deleteRoutingTmp
export const deleteRoutingTmp = (id) => {
  return httpClient.delete(
    server.MASTER_ROUTING_TMP + `/deleteRoutingTmp/${id}`
  );
};

//getRoutingTmpNewByRtgMainId
export const getRoutingTmpNewByRtgMainId = (rtg_main_id) => {
  return httpClient.get(
    server.MASTER_ROUTING_TMP + `/getRoutingTmpNewByRtgMainId/${rtg_main_id}`
  );
};

//getMainRoutingByItemAndRtgId
export const getMainRoutingByItemAndRtgId = (
  item_master_id,
  rtg_id,
  company_id
) => {
  return httpClient.get(
    server.MASTER_ROUTING_TMP +
      `/getMainRoutingByItemAndRtgId/${item_master_id}/${rtg_id}/${company_id}`
  );
};

//getRoutingTmpById
export const getRoutingTmpById = (id) => {
  return httpClient.get(server.MASTER_ROUTING_TMP + `/getRoutingTmpById/${id}`);
};

//updateMainRouting
export const updateMainRouting = (id, data) => {
  return httpClient.put(
    server.MASTER_ROUTING_TMP + `/updateMainRouting/${id}`,
    data
  );
};
