import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";
const { DASHBOARD } = server;
/// ------ reset pass,send email, old api ------

export const getMachineAvailabilityData = ({
  start,
  end,
  downtime_id,
  wcg_id,
  wc_id,
  mch_id,
}) => {
  let url = `${DASHBOARD}?start=${start}&end=${end}`;
  if (downtime_id) {
    url += `&downtime_id=${downtime_id}`;
  }
  if (wcg_id) {
    url += `&wcg_id=${wcg_id}`;
  }
  if (wc_id) {
    url += `&wc_id=${wc_id}`;
  }
  if (mch_id) {
    url += `&mch_id=${mch_id}`;
  }
  return httpClient.get(url);
};

export const getDowntimeDashboard = ({ start, end, downtime_id }) => {
  let url = `${DASHBOARD}/downtime?start=${start}&end=${end}`;
  if (downtime_id) {
    url += `&downtime_id=${downtime_id}`;
  }
  return httpClient.get(url);
};

export const getPerformanceDashboard = ({
  start,
  end,
  wcg_id,
  wc_id,
  ig_id,
  item_id,
  opn_ord_id,
}) => {
  let url = `${DASHBOARD}/productivity?start=${start}&end=${end}`;
  if (wcg_id) {
    url += `&wcg_id=${wcg_id}`;
  }
  if (wc_id) {
    url += `&wc_id=${wc_id}`;
  }
  if (ig_id) {
    url += `&ig_id=${ig_id}`;
  }
  if (item_id) {
    url += `&item_id=${item_id}`;
  }
  if (opn_ord_id) {
    url += `&opn_ord_id=${opn_ord_id}`;
  }
  return httpClient.get(url);
};

export const getMonthlyPerformance = ({ start, end }) => {
  const url = `${DASHBOARD}/productivity/monthly?start=${start}&end=${end}`;
  return httpClient.get(url);
};

export const getWorkCenterPerformance = ({ start, end }) => {
  const url = `${DASHBOARD}/productivity/work-center?start=${start}&end=${end}`;
  return httpClient.get(url);
};

export const getTargetDashboard = ({ start, end }) => {
  const url = `${DASHBOARD}/target?start=${start}&end=${end}`;
  return httpClient.get(url);
};

export const getMonthlyDashboard = ({ start, end }) => {
  const url = `${DASHBOARD}/monthly?start=${start}&end=${end}`;
  return httpClient.get(url);
};

export const getTargetPerformance = ({ start, end }) => {
  const url = `${DASHBOARD}/productivity/target?start=${start}&end=${end}`;
  return httpClient.get(url);
};

export const getQualityDashboardData = ({
  start,
  end,
  wcg_id,
  wc_id,
  ig_id,
  item_id,
  opn_ord_id,
}) => {
  let url = `${DASHBOARD}/quality?start=${start}&end=${end}`;
  if (wcg_id) {
    url += `&wcg_id=${wcg_id}`;
  }
  if (wc_id) {
    url += `&wc_id=${wc_id}`;
  }
  if (ig_id) {
    url += `&ig_id=${ig_id}`;
  }
  if (item_id) {
    url += `&item_id=${item_id}`;
  }
  if (opn_ord_id) {
    url += `&opn_ord_id=${opn_ord_id}`;
  }
  return httpClient.get(url);
};

export const getQualityDailyDashboardData = ({
  start,
  end,
  wcg_id,
  wc_id,
  ig_id,
  item_id,
  opn_ord_id,
}) => {
  let url = `${DASHBOARD}/quality/daily?start=${start}&end=${end}`;
  if (wcg_id) {
    url += `&wcg_id=${wcg_id}`;
  }
  if (wc_id) {
    url += `&wc_id=${wc_id}`;
  }
  if (ig_id) {
    url += `&ig_id=${ig_id}`;
  }
  if (item_id) {
    url += `&item_id=${item_id}`;
  }
  if (opn_ord_id) {
    url += `&opn_ord_id=${opn_ord_id}`;
  }
  return httpClient.get(url);
};

export const getDefectByWorkCenter = ({ start, end }) => {
  const url = `${DASHBOARD}/quality/work_center/defect?start=${start}&end=${end}`;
  return httpClient.get(url);
};

export const getTop10Defect = ({ start, end }) => {
  const url = `${DASHBOARD}/quality/defect?start=${start}&end=${end}`;
  return httpClient.get(url);
};

export const getQualityRateByItemGroup = ({
  start,
  end,
  wcg_id,
  wc_id,
  ig_id,
  item_id,
  opn_ord_id,
}) => {
  let url = `${DASHBOARD}/quality/item_group?start=${start}&end=${end}`;
  if (wcg_id) {
    url += `&wcg_id=${wcg_id}`;
  }
  if (wc_id) {
    url += `&wc_id=${wc_id}`;
  }
  if (ig_id) {
    url += `&ig_id=${ig_id}`;
  }
  if (item_id) {
    url += `&item_id=${item_id}`;
  }
  if (opn_ord_id) {
    url += `&opn_ord_id=${opn_ord_id}`;
  }
  return httpClient.get(url);
};

export const getQualityRateByItem = ({
  start,
  end,
  wcg_id,
  wc_id,
  ig_id,
  item_id,
  opn_ord_id,
}) => {
  let url = `${DASHBOARD}/quality/item?start=${start}&end=${end}`;
  if (wcg_id) {
    url += `&wcg_id=${wcg_id}`;
  }
  if (wc_id) {
    url += `&wc_id=${wc_id}`;
  }
  if (ig_id) {
    url += `&ig_id=${ig_id}`;
  }
  if (item_id) {
    url += `&item_id=${item_id}`;
  }
  if (opn_ord_id) {
    url += `&opn_ord_id=${opn_ord_id}`;
  }
  return httpClient.get(url);
};

export const getOEEDashboardData = ({ start, end, wcg_id, wc_id }) => {
  let url = `${DASHBOARD}/OEE?start=${start}&end=${end}`;
  if (wcg_id) {
    url += `&wcg_id=${wcg_id}`;
  }
  if (wc_id) {
    url += `&wc_id=${wc_id}`;
  }
  return httpClient.get(url);
};

export const getOEEDailyDashboardData = ({ start, end, wcg_id, wc_id }) => {
  let url = `${DASHBOARD}/OEE/daily?start=${start}&end=${end}`;
  if (wcg_id) {
    url += `&wcg_id=${wcg_id}`;
  }
  if (wc_id) {
    url += `&wc_id=${wc_id}`;
  }
  return httpClient.get(url);
};
