import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const listTimecardByCompany = (company_id) => {
  return httpClient.get(server.TIMECARD + `/company/${company_id}`);
};

export const listOwnTimecard = () => {
  return httpClient.get(server.TIMECARD + `/own`);
};

export const getTimecardWithUDefined = (tc_id, u_defined_module_id) => {
  return httpClient.get(`${server.TIMECARD}/${tc_id}/${u_defined_module_id}`);
};

export const getTimecardById = (tc_id) => {
  return httpClient.get(`${server.TIMECARD}/${tc_id}/log`);
};

export const getWorkOrderOption = () => {
  return httpClient.get(`${server.TIMECARD}/work_order/option`);
};

export const getTimeCardDetails = () => {
  return httpClient.get(`${server.TIMECARD}/time-card-detail`);
};

export const getOpnOrdOption = (company_id) => {
  return httpClient.get(`${server.TIMECARD}/opn-ord/company/${company_id}`);
};

export const postTimecard = (timecard_id) => {
  try {
    return httpClient.post(`${server.TIMECARD}/${timecard_id}/post`);
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};

export const postTimecardV2 = (timecard_id) => {
  try {
    return httpClient.post(`${server.TIMECARD}/${timecard_id}/post-v2`);
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};

export const postJobTimecard = (timecard_id, start_time, end_time) => {
  try {
    return httpClient.post(`${server.TIMECARD}/${timecard_id}/post-job`, {
      start_time,
      end_time,
    });
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};

export const getOpnOrd = (opn_ord_id) =>
  httpClient.get(`${server.TIMECARD}/opn-ord/${opn_ord_id}`);

export const deleteTimecardLog = (time_card_id, time_card_log_id) =>
  httpClient.delete(
    `${server.TIMECARD}/${time_card_id}/log/${time_card_log_id}`
  );

export const deleteTimecard = (time_card_id) =>
  httpClient.delete(`${server.TIMECARD}/${time_card_id}`);

export const deleteTimecardDetail = (time_card_id) =>
  httpClient.delete(`${server.TIMECARD}/deletedetail/${time_card_id}`);

// export const getMachineById = (id, u_define_module_id) => {
//   return httpClient.get(server.MACHINE + `/${id}/${u_define_module_id}`);
// };

// export const getMachineWithWCById = (mch_id) => {
//   return httpClient.get(server.MACHINE + `/${mch_id}`)
// }

export const addTimecard = (data) => {
  return httpClient.post(server.TIMECARD + `/`, data);
};

export const addTimecardforIOTMapping = (data) => {
  return httpClient.post(server.TIMECARD + `/createforiotmapping`, data);
};

export const upsertTimecardLog = (data) => {
  return httpClient.post(`${server.TIMECARD}/${data.id}/log`, data);
};

export const getTimecardDetailReceiveQty = (time_card_id) => {
  return httpClient.get(
    `${server.TIMECARD}/time-card-detail/${time_card_id}/receive-qty`
  );
};

export const endTimecardDetail = (data) => {
  return httpClient.post(
    `${server.TIMECARD}/time-card-detail/${data.id}/end`,
    data
  );
};

export const getMachineOpnRunning = (machine_id) => {
  return httpClient.get(
    `${server.TIMECARD}/time-card-detail/machine/${machine_id}/running-opn`
  );
};

export const getTimecardReport = (shift_id, start, end, isLeader) => {
  return httpClient.get(
    `${server.TIMECARD}/shift/${shift_id}/report?start_date=${start}&end_date=${end}&is_leader=${isLeader}`
  );
};
// export const updateMachine = (id, data) => {
//   return httpClient.put(server.MACHINE + `/${id}`, data);
// };

// export const deleteMachine = (id) => {
//   return httpClient.delete(server.MACHINE + `/${id}`);
// };

// export const listMachineShift = (machine_id) => {
//   return httpClient.get(server.MACHINE + `/${machine_id}/shift`)
// }

// export const addMachineShift = (machine_id, data) => {
//   return httpClient.post(server.MACHINE + `/${machine_id}/shift`, data)
// }

// export const deleteMachineShift = (machine_id, shift_id) => {
//   return httpClient.delete(server.MACHINE + `/${machine_id}/shift/${shift_id}`)
// }

export const listDeleteJobByCompany = (data) => {
  return httpClient.post(server.TIMECARD + `/get/getdeletejobbycompany`, data);
};

export const getListDocumentsNycompany = (company_id) => {
  return httpClient.get(
    `${server.TIMECARD}/get/list_doc_running_no_option/${company_id}`
  );
};

export const getTimecardWorkOrderOption = (company_id) => {
  return httpClient.get(
    `${server.TIMECARD}/time_card/work_order/option/${company_id}`
  );
};


export const checkOpnInUsedInTimecardDetailByOpnId = (opn_id) => {
  return httpClient.get(
    `${server.TIMECARD}/time_card_detail/check_opn_id_ues/${opn_id}`
  );
};
