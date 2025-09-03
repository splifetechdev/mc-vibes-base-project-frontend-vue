import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getWorker = () => {
  return httpClient.get(server.WORKER_URL + `/get`);
};

export const getWorkerByCompany = () => {
  return httpClient.get(server.WORKER_URL + `/getByCompany`);
};

export const getWorkerid = (id) => {
  return httpClient.get(server.WORKER_URL + `/${id}`);
};

export const addWorker = (data) => {
  return httpClient.post(server.WORKER_URL + "/addUserAccount", data);
};

export const updateWorker = (id, data) => {
  return httpClient.put(server.WORKER_URL + `/${id}`, data);
};

export const deleteWorker = (id) => {
  return httpClient.delete(server.WORKER_URL + `/${id}`);
};

export const getWorkerDetail = (id) => {
  return httpClient.get(server.WORKER_URL + `/${id}`);
};

export const ChangeapprovalWorkerAccount = (data) => {
  return httpClient.post(server.WORKER_URL + `/changeapprovalworker`, data);
};

export const workerCheckIn = (data) => {
  return httpClient.post(server.WORKER_URL + `/check-in`, data);
};

export const import_Worker = (data) => {
  return httpClient.post(server.WORKER_URL + `/import_worker`,data);
};