import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const listMachineByCompany = (company_id) => {
  return httpClient.get(server.MACHINE + `/company/${company_id}`);
};

export const getAllMchToAdjustPOByCompany = (company_id) => {
  return httpClient.get(
    server.MACHINE + `/getAllMchToAdjustPOByCompany/${company_id}/adjustPO`
  );
};

export const getMachineById = (id, u_define_module_id) => {
  return httpClient.get(server.MACHINE + `/${id}/${u_define_module_id}`);
};

export const getMachineWithWCById = (mch_id) => {
  return httpClient.get(server.MACHINE + `/${mch_id}`);
};

export const listMachineByWorkcenterID = (work_center_id) => {
  return httpClient.post(
    server.MACHINE + `/getbycworkcenterid/${work_center_id}`
  );
};

export const addMachine = (data) => {
  return httpClient.post(server.MACHINE + `/`, data);
};

export const updateMachine = (id, data) => {
  return httpClient.put(server.MACHINE + `/${id}`, data);
};

export const deleteMachine = (id) => {
  return httpClient.delete(server.MACHINE + `/${id}`);
};

export const listMachineShift = (machine_id) => {
  return httpClient.get(server.MACHINE + `/${machine_id}/shift`);
};

export const addMachineShift = (machine_id, data) => {
  return httpClient.post(server.MACHINE + `/${machine_id}/shift`, data);
};

export const deleteMachineShift = (machine_id, shift_id) => {
  return httpClient.delete(server.MACHINE + `/${machine_id}/shift/${shift_id}`);
};

export const listMachineGanttchart = (work_center_id, data) => {
  return httpClient.post(
    server.MACHINE + `/getdataganttchart/${work_center_id}`,
    data
  );
};

export const import_Machine = (data) => {
  return httpClient.post(server.MACHINE + `/import_mch`,data);
};