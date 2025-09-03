import httpClient from "@/services/httpClient";
import {
  server
} from "@/services/constants";

export const getDocumenttype = () => {
  return httpClient.get(server.DOCUMENTTYPE + `/getAll`);
};

export const getDocumenttypeById = (id) => {
  return httpClient.get(server.DOCUMENTTYPE + `/getByid/${id}`);
};

export const getDocumenttypeadd = (data) => {
  return httpClient.post(server.DOCUMENTTYPE, data);
};

export const getDocumenttypeupdate = (id, data) => {
  return httpClient.put(server.DOCUMENTTYPE + `/${id}`, data);
};

export const getDocumenttypedelete = (id) => {
  return httpClient.delete(server.DOCUMENTTYPE + `/${id}`);
};