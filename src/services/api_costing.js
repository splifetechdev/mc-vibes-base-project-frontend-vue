import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";


export const CostingSearchByV_ORD_costing = (data) => {
  return httpClient.post(
    server.COSTING + `/searchByV_ORD_costing`,
    data
  );
};

export const SearchBycostingmanual = (data) => {
  return httpClient.post(
    server.COSTING + `/runcostbymanual`,
    data
  );
};

export const SearchORDCostingDetailH = (data) => {
  return httpClient.post(
    server.COSTING + `/SearchORDCostingDetailH`,
    data
  );
};

export const SearchORDCostingDetailD = (data) => {
  return httpClient.post(
    server.COSTING + `/SearchORDCostingDetailD`,
    data
  );
};