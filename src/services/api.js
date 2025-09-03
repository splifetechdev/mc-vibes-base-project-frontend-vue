import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";
import router from "@/router";
import * as productApis from "@/services/api_product.js";
import * as accountApis from "@/services/api_account.js";
import * as groupMenuApis from "@/services/api_group_menu.js";
import * as settingGroupMenuApis from "@/services/api_setting_group_menu.js";
import * as menuDetailApis from "@/services/api_menu_detail.js";
import * as settingMenuDetailApis from "@/services/api_setting_menu_detail.js";
import * as departmentApis from "@/services/api_department.js";
import * as documentTypeApis from "@/services/api_document_type.js";
import * as docRunningApis from "@/services/api_doc_running.js";
import * as companyApis from "@/services/api_company.js";
import * as positionApis from "@/services/api_position.js";
import * as divisionApis from "@/services/api_division.js";
import * as sectionApis from "@/services/api_section.js";
import * as workerApis from "@/services/api_worker.js";
import * as groupItemApis from "@/services/api_group_item.js";
import * as unitApis from "@/services/api_unit.js";
import * as itemmasterApis from "@/services/api_item_master.js";
import * as u_define_masterApis from "@/services/api_u_define_master.js";
import * as u_define_moduleApis from "@/services/api_u_define_module.js";
import * as item_typeApis from "@/services/api_item_type.js";
import * as dim_groupApis from "@/services/api_dim_group.js";
import * as model_groupApis from "@/services/api_model_group.js";
import * as defect_causeApis from "@/services/api_defect_cause.js";
import * as shiftApis from "@/services/api_shift.js";
import * as machineApis from "@/services/api_machine.js";
import * as workCenterGroupApis from "@/services/api_work_center_group.js";
import * as workCenterApis from "@/services/api_work_center.js";
import * as downTimeCauseApis from "@/services/api_downtime_cause.js";
import * as kpiMasterApis from "@/services/api_kpi_master.js";
import * as kpiTitleApis from "@/services/api_kpi_title.js";
import * as plc_mapping_MachineApis from "@/services/api_plc_mapping_machine.js";
import * as holidayApis from "@/services/api_holiday.js";
import * as routingApis from "@/services/api_routing.js";
import * as productionOrderApis from "@/services/api_production_order.js";
import * as productionOrderDraftApis from "@/services/api_production_order_draft.js";
import * as timecardApis from "@/services/api_time_card.js";
import * as holidayMchApis from "@/services/api_holiday_mch.js";
import * as orderApis from "@/services/api_order.js";
import * as jobApis from "@/services/api_job.js";
import * as MapProductApis from "@/services/api_map_production.js";
import * as tempOpnOrdApis from "@/services/api_temp_opn_ord.js";
import * as dashboardApis from "@/services/api_dashboard.js";
import * as ord_recieveApis from "@/services/api_ord_recieve.js";
import * as timecardDefectApi from "@/services/api_time_card_defect.js";
import * as warehouseApis from "@/services/api_warehouse.js";
import * as locationApis from "@/services/api_location.js";
import * as sheftApis from "@/services/api_sheft.js";
import * as receiveFromPO from "@/services/api_receive_from_po.js";
import * as routingTmpApis from "@/services/api_routing_tmp.js";
import * as reportAllApis from "@/services/api_reportall.js";
import * as costingApis from "@/services/api_costing.js";
import * as shiftOTApis from "@/services/api_shift_ot.js";

const isLoggedIn = () => {
  let token = localStorage.getItem(server.TOKEN_KEY);
  // console.log({ token })
  return !!token;
};

const login = async (values) => {
  try {
    let result = await httpClient.post(
      server.ACCOUNT_URL + "/" + server.LOGIN_URL,
      values
    );
    // console.log("login log : " + JSON.stringify(values));

    if (
      result.status == 200 &&
      (result.data.token != null || result.data.token != "")
    ) {
      // console.log("login log : " + "token ok");

      localStorage.setItem(server.USERNAME, values.username);
      localStorage.setItem(server.USER_ID, result.data.user_id);
      localStorage.setItem(server.TOKEN_KEY, result.data.token);
      localStorage.setItem(server.FULLNAME, result.data.acc_fullname);
      localStorage.setItem(server.ROLE, result.data.role);
      localStorage.setItem(server.COMPANYID, result.data.company_id);
      localStorage.setItem(server.DEPARTMENT_ID, result.data.department_id);
      localStorage.setItem(server.POSITION_ID, result.data.position_id);
      localStorage.setItem(server.AUTHORIZE_ID, result.data.authorize_id);
      localStorage.setItem(server.EMAIL_URL, result.data.email);
      localStorage.setItem(server.VERSION, result.data.v_web);
      localStorage.setItem(server.APPROVE_LEVEL1, result.data.approver_level1);
      localStorage.setItem(
        server.APPROVE_LEVEL1_EMAIL,
        result.data.approver_level1_email
      );

      // localStorage.setItem(server.COMPANY_NAME, result.data.company_name);
      // localStorage.setItem(server.DEPARTMENT_NAME, result.data.department_name);
      // localStorage.setItem(server.ACC_PLAN_STA, result.data.acc_plan);
      router.push("/dashboard");
      return true;
    } else if (result.status == 406) {
      alert("Program Expired. Please Contact Provider");
      // console.log("login log : " + "result error");
      return false;
    } else {
      alert("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง");
      // console.log("login log : " + "result error");
      return false;
    }
  } catch (error) {
    if (error.response.status == 406) {
      alert("Program Expired. Please Contact Provider");
      return false;
    } else {
      alert("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง");
      return false;
    }
  }
};

const register = async (values) => {
  let result = await httpClient.post(server.REGISTER_URL, values);
  if (result.data.result == "ok") {
    router.go(-1);
  } else {
    alert(JSON.stringify(result));
  }
};

const logoff = () => {
  localStorage.removeItem(server.TOKEN_KEY);
  localStorage.clear();
  router.push("/login");
};

const checkVersion = () => {
  try {
    const version = localStorage.getItem(server.VERSION);
    // console.log("checkVersion version:", version);
    if (version !== "101") {
      // this.$store.dispatch("doLogout");
      localStorage.removeItem(server.TOKEN_KEY);
      localStorage.clear();
      // router.push("/login");
    }
  } catch (error) {
    // this.$store.dispatch("doLogout");
    localStorage.removeItem(server.TOKEN_KEY);
    localStorage.clear();
    // router.push("/login");
    // console.log("checkVersion error:", error);
  }
};

export default {
  isLoggedIn,
  login,
  register,
  logoff,
  checkVersion,
  ...productApis,
  ...accountApis,
  ...groupMenuApis,
  ...menuDetailApis,
  ...settingGroupMenuApis,
  ...settingMenuDetailApis,
  ...departmentApis,
  ...documentTypeApis,
  ...docRunningApis,
  ...companyApis,
  ...positionApis,
  ...divisionApis,
  ...sectionApis,
  ...workerApis,
  ...groupItemApis,
  ...unitApis,
  ...itemmasterApis,
  ...u_define_masterApis,
  ...u_define_moduleApis,
  ...item_typeApis,
  ...dim_groupApis,
  ...model_groupApis,
  ...defect_causeApis,
  ...shiftApis,
  ...workCenterGroupApis,
  ...machineApis,
  ...workCenterApis,
  ...downTimeCauseApis,
  ...kpiMasterApis,
  ...kpiTitleApis,
  ...plc_mapping_MachineApis,
  ...holidayApis,
  ...routingApis,
  ...productionOrderApis,
  ...productionOrderDraftApis,
  ...timecardApis,
  ...holidayMchApis,
  ...orderApis,
  ...jobApis,
  ...MapProductApis,
  ...tempOpnOrdApis,
  ...dashboardApis,
  ...ord_recieveApis,
  ...timecardDefectApi,
  ...warehouseApis,
  ...locationApis,
  ...sheftApis,
  ...receiveFromPO,
  ...routingTmpApis,
  ...reportAllApis,
  ...costingApis,
  ...shiftOTApis,
};

//my-memo
//e-memo
//s-memo
//approval
