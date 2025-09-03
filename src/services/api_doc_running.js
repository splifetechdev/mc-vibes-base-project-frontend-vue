import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getDoc_running = () => {
  return httpClient.get(server.DOCRUNNING + `/getAll`);
};

export const getDocRunningGroupByGroupName = (groupName) => {
  return httpClient.get(`${server.DOCRUNNING}/${groupName}`)
}

export const getAllByGroupPD = () => {
  return httpClient.get(server.DOCRUNNING + `/getAllByGroupPD`);
};

export const getDocGroup = () => {
  return httpClient.get(server.DOCRUNNING + `/getAllDocGroup`)
}

export const getDoc_runningById = (id) => {
  return httpClient.get(server.DOCRUNNING + `/getByid/${id}`);
};

export const addDocRunning = (data) => {
  return httpClient.post(server.DOCRUNNING, data);
};

export const getDoc_runningupdate = (id, data) => {
  return httpClient.put(server.DOCRUNNING + `/${id}`, data);
};

export const getDoc_runningdelete = (id) => {
  return httpClient.delete(server.DOCRUNNING + `/${id}`);
};
