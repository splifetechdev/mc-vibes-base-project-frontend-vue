import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getMapProductByCompanyID = (id) => {
  return httpClient.get(server.MAPPRODUCT + `/${id}`);
};

export const getMapProductByProductivity = (data) => {
  return httpClient.post(server.MAPPRODUCT + `/findmap_productionAllProductivity`,data);
};

export const getMapProductByDownTime = (data) => {
  return httpClient.post(server.MAPPRODUCT + `/findmap_productionAllDownTime`,data);
};

export const addMapProduct = (data) => {
  return httpClient.post(server.MAPPRODUCT + `/`, data);
};

export const updateAllMapProduct = (data) => {
  return httpClient.put(server.MAPPRODUCT + `/updateAll`, data);
};

export const DeleteMapProduct= (id) => {
  return httpClient.delete(server.MAPPRODUCT + `/${id}`);
};