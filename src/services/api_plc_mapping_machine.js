import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getPLCMappingMachinetByCompanyID = (id) => {
  return httpClient.get(server.PLC_MAPPING_MACHINE + `/${id}`);
};

export const getPLCMappingMachinetByID = (id,u_define_id) => {
  return httpClient.get(server.PLC_MAPPING_MACHINE + `/getAllByID/${id}/${u_define_id}`);
};

export const addPLCMappingMachinet = (data) => {
  return httpClient.post(server.PLC_MAPPING_MACHINE + `/`, data);
};

export const updatePLCMappingMachinet = (id, data) => {
  return httpClient.put(server.PLC_MAPPING_MACHINE + `/${id}`, data);
};

export const DeletePLCMappingMachinet= (id) => {
  return httpClient.delete(server.PLC_MAPPING_MACHINE + `/${id}`);
};