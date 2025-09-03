import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getTempOpnOrderPlanDraftByID = (
  doc_running,
  rtg_id,
  item_master_id
) => {
  return httpClient.get(
    server.TEMP_OPN_ORD +
      `/getProdOrderPlanByID/${doc_running}/${rtg_id}/${item_master_id}`
  );
};
