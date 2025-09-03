import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getORD_RecieveByCompanyID = (id) => {
  return httpClient.get(server.ORD_RECIEVE + `/getAll`);
};

export const getAllORD_RecieveByOrdID = (id) => {
  return httpClient.get(server.ORD_RECIEVE + `/getByord_id/${id}`);
};

export const addORD_Recieve = (data) => {
  return httpClient.post(server.ORD_RECIEVE + `/`, data);
};

export const updateORD_Recieve = (id, data) => {
  return httpClient.put(server.ORD_RECIEVE + `/${id}`, data);
};

export const DeleteORD_Recieve = (id) => {
  return httpClient.delete(server.ORD_RECIEVE + `/${id}`);
};
