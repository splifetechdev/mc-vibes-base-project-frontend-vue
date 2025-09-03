import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const upsertDefect = (data) => {
  return httpClient.post(server.TIME_CARD_DEFECT + ``, data);
};
