import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Stock from "@/views/Stock.vue";
import StockCreate from "@/views/StockCreate.vue";
import StockEdit from "@/views/StockEdit.vue";
import Report from "@/views/Report.vue";
import About from "@/views/About.vue";
import Dashboard from "@/views/Dashboard.vue";
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import GroupMenu from "@/views/menuconfig/GroupMenu.vue";
import SettingGroupMenu from "@/views/menuconfig/SettingGroupMenu.vue";
import MenuDetail from "@/views/menuconfig/MenuDetail.vue";
import SettingMenuDetail from "@/views/menuconfig/SettingMenuDetail.vue";

import Employee from "@/views/user/User.vue";
import ResetPass from "@/views/accountManagement/ResetPass.vue";
import ForgotPass from "@/views/accountManagement/ForgotPass.vue";
import ForgotResetPass from "@/views/accountManagement/ForgotResetPass.vue";

import Department from "@/views/administrator/department.vue";
import Company from "@/views/administrator/Company.vue";
import CompanyCreate from "@/views/administrator/CompanyCreate.vue";
import CompanyEdit from "@/views/administrator/CompanyEdit.vue";
import Position from "@/views/administrator/Position.vue";
import Division from "@/views/administrator/division.vue";
import Section from "@/views/administrator/section.vue";

import Warehouse from "@/views/administrator/Warehouse.vue";
import Location from "@/views/administrator/Location.vue";
import Sheft from "@/views/administrator/Sheft.vue";

import UserAdd from "@/views/user/UserAdd.vue";
import UserEdit from "@/views/user/UserEdit.vue";

import Worker from "@/views/worker/Worker.vue";
import WorkerCheckIn from "@/views/worker/WorkerCheckIn.vue";
import WorkerCheckOut from "@/views/worker/WorkerCheckOut.vue";
import WorkerAdd from "@/views/worker/WorkerAdd.vue";
import WorkerEdit from "@/views/worker/WorkerEdit.vue";

import DocRuningConfig from "@/views/config/DocRuningConfig.vue";

import ItemGroup from "@/views/itemgroup/ItemGroup.vue";
import Unit from "@/views/unit/Unit.vue";
import ItemList from "@/views/item/ItemList.vue";
import ItemAdd from "@/views/item/ItemAdd.vue";
import ItemEdit from "@/views/item/ItemEdit.vue";

import WorkCenterGroupList from "@/views/workCenterGroup/WorkCenterGroupList.vue";
import WorkCenterGroupAdd from "@/views/workCenterGroup/WorkCenterGroupAdd.vue";
import WorkCenterGroupEdit from "@/views/workCenterGroup/WorkCenterGroupEdit.vue";

import DefectCauseList from "@/views/defect-cause/DefectCauseList.vue";
import DefectCauseAdd from "@/views/defect-cause/DefectCauseAdd.vue";
import DefectCauseEdit from "@/views/defect-cause/DefectCauseEdit.vue";

import ShiftList from "@/views/shift/ShiftList.vue";
import ShiftAdd from "@/views/shift/ShiftAdd.vue";
import ShiftEdit from "@/views/shift/ShiftEdit.vue";

import WorkCenterList from "@/views/workCenter/WorkCenterList.vue";
import WorkCenterAdd from "@/views/workCenter/WorkCenterAdd.vue";
import WorkCenterEdit from "@/views/workCenter/WorkCenterEdit.vue";

import DownTimeCauseList from "@/views/downTimeCause/DownTimeCauseList.vue";
import DownTimeCauseAdd from "@/views/downTimeCause/DownTimeCauseAdd.vue";
import DownTimeCauseEdit from "@/views/downTimeCause/DownTimeCauseEdit.vue";

import MachineList from "@/views/machine/MachineList.vue";
import MachineAdd from "@/views/machine/MachineAdd.vue";
import MachineEdit from "@/views/machine/MachineEdit.vue";

import KPIMasterList from "@/views/kpiMaster/KPIMasterList.vue";
import KPIMasterAdd from "@/views/kpiMaster/KPIMasterAdd.vue";
import KPIMasterEdit from "@/views/kpiMaster/KPIMasterEdit.vue";

import PLCMappingList from "@/views/PLCMappingMachine/PLCMappingList.vue";
import PLCMappingAdd from "@/views/PLCMappingMachine/PLCMappingAdd.vue";
import PLCMappingEdit from "@/views/PLCMappingMachine/PLCMappingEdit.vue";

import HolidayList from "@/views/holiday/HolidayList.vue";
import HolidayAdd from "@/views/holiday/HolidayAdd.vue";
import HolidayEdit from "@/views/holiday/HolidayEdit.vue";

import RoutingList from "@/views/Routing/RoutingList.vue";
import RoutingAdd from "@/views/Routing/RoutingAdd.vue";
import RoutingEdit from "@/views/Routing/RoutingEdit.vue";

import WorkOrderList from "@/views/workOrder/WorkOrderList.vue";
import WorkOrderAdd from "@/views/workOrder/WorkOrderAdd.vue";
import WorkOrderEdit from "@/views/workOrder/WorkOrderEdit.vue";

import TimeCardList from "@/views/timeCard/TimeCardList.vue";
import TimeCardAdd from "@/views/timeCard/TimeCardAdd.vue";
import TimeCardEdit from "@/views/timeCard/TimeCardEdit.vue";
import TimeCardReport from "@/views/timeCard/TimeCardReport.vue";
import LeaderTimeCardReport from "../views/timeCard/LeaderTimeCardReport.vue";

import Scheduling from "@/views/scheduling/scheduling.vue";

import JobList from "@/views/jobs/JobList.vue";
import JobList_TFMS from "@/views/jobs/JobList_TFMS.vue";

import IOTMapping from "@/views/IOTMapping/iotmapping.vue";

import AvailabilityDashboard from "@/views/AvailabilityDashboard.vue";
import ProductivityDashboard from "@/views/ProductivityDashboard.vue";
import QualityDashboard from "@/views/QualityDashboard.vue";
import OEEDashboard from "@/views/OEEDashboard.vue";

import UdefinemoduleList from "@/views/udefinemodule/UdefinemoduleList.vue";
import UdefinemoduleEdit from "@/views/udefinemodule/UdefinemoduleEdit.vue";

import receiveProductionorderList from "@/views/receiveProductionorder/receiveProductionorderList.vue";
import receiveProductionorderEdit from "@/views/receiveProductionorder/receiveProductionorderEdit.vue";

import productionstatusreportlist from "@/views/productionstatusreport/productionstatusreportlist.vue";

import ReceiveFromProductionList from "@/views/Inventory/ReceiveFromProductionList.vue";
import ReceiveFromProductionEdit from "@/views/Inventory/ReceiveFromProductionEdit.vue";

import ReportClothRegistration from "@/views/report/report_on_inquiries_about_cloth_registration.vue";

import DeleteJob from "@/views/deletejob/DeleteJob.vue";

import ReCalCosting from "@/views/costing/Costing.vue";
import ReCalCostingDetails from "@/views/costing/CostingDetails.vue";
import CalculateCost from "@/views/costing/calculatecost.vue";

import FileImportSystem from "@/views/fileimportsystem/FileImportSystem.vue";


Vue.use(VueRouter);

const routes = [
    {
    path: "/file-import-system",
    meta: {
      isSecured: false,
    },
    name: "FileImportSystem",
    component: FileImportSystem,
  },
  {
    path: "/re-cal-costing-details/:doc_running_no",
    meta: {
      isSecured: false,
    },
    name: "ReCalCostingDetails",
    component: ReCalCostingDetails,
  },
  {
    path: "/calculate-cost",
    meta: {
      isSecured: false,
    },
    name: "CalculateCost",
    component: CalculateCost,
  },
  {
    path: "/re-cal-costing",
    meta: {
      isSecured: false,
    },
    name: "ReCalCosting",
    component: ReCalCosting,
  },
  {
    path: "/delete-job",
    meta: {
      isSecured: false,
    },
    name: "DeleteJob",
    component: DeleteJob,
  },
  {
    path: "/report-on-inquiries-about-cloth-registration",
    meta: {
      isSecured: false,
    },
    name: "ReportClothRegistration",
    component: ReportClothRegistration,
  },
  {
    path: "/receive-from-production-edit/:id",
    meta: {
      isSecured: false,
    },
    name: "ReceiveFromProductionEdit",
    component: ReceiveFromProductionEdit,
    props: (route) => ({ json_item: route.query.json_item }),
  },
  {
    path: "/receive-from-production-list",
    meta: {
      isSecured: false,
    },
    name: "ReceiveFromProductionList",
    component: ReceiveFromProductionList,
  },
  {
    path: "/warehouse",
    meta: {
      isSecured: false,
    },
    name: "Warehouse",
    component: Warehouse,
  },
  {
    path: "/location",
    meta: {
      isSecured: false,
    },
    name: "Location",
    component: Location,
  },
  {
    path: "/sheft",
    meta: {
      isSecured: false,
    },
    name: "Sheft",
    component: Sheft,
  },
  {
    path: "/production-status-report",
    meta: {
      isSecured: false,
    },
    name: "productionstatusreportlist",
    component: productionstatusreportlist,
  },
  {
    path: "/receive-production-order-list",
    meta: {
      isSecured: false,
    },
    name: "receiveProductionorderList",
    component: receiveProductionorderList,
  },
  {
    path: "/receive-production-order-edit/:id",
    meta: {
      isSecured: false,
    },
    name: "receiveProductionorderEdit",
    component: receiveProductionorderEdit,
  },
  {
    path: "/u-define-module-edit/:id",
    meta: {
      isSecured: false,
    },
    name: "UdefinemoduleEdit",
    component: UdefinemoduleEdit,
  },
  {
    path: "/u-define-module",
    meta: {
      isSecured: false,
    },
    name: "UdefinemoduleList",
    component: UdefinemoduleList,
  },
  {
    path: "/iot-mapping",
    meta: {
      isSecured: false,
    },
    name: "IOTMapping",
    component: IOTMapping,
  },
  {
    path: "/scheduling",
    meta: {
      isSecured: false,
    },
    name: "Scheduling",
    component: Scheduling,
  },
  {
    path: "/production-order-list",
    meta: {
      isSecured: false,
    },
    name: "WorkOrderList",
    component: WorkOrderList,
  },
  {
    path: "/production-order-add",
    meta: {
      isSecured: false,
    },
    name: "WorkOrderAdd",
    component: WorkOrderAdd,
  },
  {
    path: "/production-order-edit/:id",
    meta: {
      isSecured: false,
    },
    name: "WorkOrderEdit",
    component: WorkOrderEdit,
  },
  {
    path: "/holiday-list",
    meta: {
      isSecured: false,
    },
    name: "HolidayList",
    component: HolidayList,
  },
  {
    path: "/holiday-add",
    meta: {
      isSecured: false,
    },
    name: "HolidayAdd",
    component: HolidayAdd,
  },
  {
    path: "/holiday-edit/:id",
    meta: {
      isSecured: false,
    },
    name: "HolidayEdit",
    component: HolidayEdit,
  },
  {
    path: "/kpi-master-list",
    meta: {
      isSecured: false,
    },
    name: "KPIMasterList",
    component: KPIMasterList,
  },
  {
    path: "/kpi-master-add",
    meta: {
      isSecured: false,
    },
    name: "KPIMasterAdd",
    component: KPIMasterAdd,
  },
  {
    path: "/kpi-master-edit/:id",
    meta: {
      isSecured: false,
    },
    name: "KPIMasterEdit",
    component: KPIMasterEdit,
  },
  {
    path: "/downtime-cause-list",
    meta: {
      isSecured: false,
    },
    name: "DownTimeCauseList",
    component: DownTimeCauseList,
  },
  {
    path: "/downtime-cause-add",
    meta: {
      isSecured: false,
    },
    name: "DownTimeCauseAdd",
    component: DownTimeCauseAdd,
  },
  {
    path: "/downtime-cause-edit/:id",
    meta: {
      isSecured: false,
    },
    name: "DownTimeCauseEdit",
    component: DownTimeCauseEdit,
  },
  {
    path: "/workcenter-list",
    meta: {
      isSecured: false,
    },
    name: "WorkCenterList",
    component: WorkCenterList,
  },
  {
    path: "/workcenter-add",
    meta: {
      isSecured: false,
    },
    name: "WorkCenterAdd",
    component: WorkCenterAdd,
  },
  {
    path: "/workcenter-edit/:id",
    meta: {
      isSecured: false,
    },
    name: "WorkCenterEdit",
    component: WorkCenterEdit,
  },
  {
    path: "/workcenter-group-list",
    meta: {
      isSecured: false,
    },
    name: "WorkCenterGroupList",
    component: WorkCenterGroupList,
  },
  {
    path: "/workcenter-group-add",
    meta: {
      isSecured: false,
    },
    name: "WorkCenterGroupAdd",
    component: WorkCenterGroupAdd,
  },
  {
    path: "/workcenter-group-edit/:id",
    meta: {
      isSecured: false,
    },
    name: "WorkCenterGroupEdit",
    component: WorkCenterGroupEdit,
  },
  {
    path: "/unit",
    meta: {
      isSecured: false,
    },
    name: "Unit",
    component: Unit,
  },
  {
    path: "/itemgroup",
    meta: {
      isSecured: false,
    },
    name: "ItemGroup",
    component: ItemGroup,
  },
  {
    path: "/docruningconfig",
    meta: {
      isSecured: false,
    },
    name: "DocRuningConfig",
    component: DocRuningConfig,
  },
  {
    path: "/department",
    meta: {
      isSecured: false,
    },
    name: "department",
    component: Department,
  },
  {
    path: "/company",
    meta: {
      isSecured: false,
    },
    name: "Company",
    component: Company,
  },
  {
    path: "/company-add",
    meta: {
      isSecured: false,
    },
    name: "CompanyCreate",
    component: CompanyCreate,
  },
  {
    path: "/user-add",
    meta: {
      isSecured: false,
    },
    name: "UserAdd",
    component: UserAdd,
  },
  {
    path: "/user-edit/:id",
    meta: {
      isSecured: false,
    },
    name: "UserEdit",
    component: UserEdit,
  },

  {
    path: "/company-edit/:id",
    meta: {
      isSecured: false,
    },
    name: "CompanyEdite",
    component: CompanyEdit,
  },
  {
    path: "/position",
    meta: {
      isSecured: false,
    },
    name: "Position",
    component: Position,
  },
  {
    path: "/division",
    meta: {
      isSecured: false,
    },
    name: "Division",
    component: Division,
  },
  {
    path: "/section",
    meta: {
      isSecured: false,
    },
    name: "Section",
    component: Section,
  },

  {
    path: "/worker",
    meta: {
      isSecured: false,
    },
    name: "Worker",
    component: Worker,
  },
  {
    path: "/worker-check-in",
    meta: {
      isSecured: false,
    },
    name: "WorkerCheckIn",
    component: WorkerCheckIn,
  },
  {
    path: "/worker-check-out",
    meta: {
      isSecured: false,
    },
    name: "WorkerCheckOut",
    component: WorkerCheckOut,
  },
  {
    path: "/worker-add",
    meta: {
      isSecured: false,
    },
    name: "WorkerAdd",
    component: WorkerAdd,
  },
  {
    path: "/worker-edit/:id",
    meta: {
      isSecured: false,
    },
    name: "WorkerEdit",
    component: WorkerEdit,
  },
  {
    path: "/item-master",
    meta: {
      isSecured: false,
    },
    name: "ItemList",
    component: ItemList,
  },
  {
    path: "/item-add",
    meta: {
      isSecured: false,
    },
    name: "ItemAdd",
    component: ItemAdd,
  },
  {
    path: "/item-edit/:id",
    meta: {
      isSecured: false,
    },
    name: "ItemEdit",
    component: ItemEdit,
  },

  {
    path: "/defect-cause",
    meta: {
      isSecured: false,
    },
    name: "DefectCauseList",
    component: DefectCauseList,
  },
  {
    path: "/defect-cause-add",
    meta: {
      isSecured: false,
    },
    name: "DefectCauseAdd",
    component: DefectCauseAdd,
  },
  {
    path: "/defect-cause-edit/:id",
    meta: {
      isSecured: false,
    },
    name: "DefectCauseEdit",
    component: DefectCauseEdit,
  },

  {
    path: "/shift",
    meta: {
      isSecured: false,
    },
    name: "ShiftList",
    component: ShiftList,
  },
  {
    path: "/shift-add",
    meta: {
      isSecured: false,
    },
    name: "ShiftAdd",
    component: ShiftAdd,
  },

  {
    path: "/shift-edit/:id",
    meta: {
      isSecured: false,
    },
    name: "ShiftEdit",
    component: ShiftEdit,
  },

  {
    path: "/machine",
    meta: {
      isSecured: false,
    },
    name: "MachineList",
    component: MachineList,
  },
  {
    path: "/machine-add",
    meta: {
      isSecured: false,
    },
    name: "MachineAdd",
    component: MachineAdd,
  },
  {
    path: "/machine/:id/edit",
    meta: {
      isSecured: false,
    },
    name: "MachineEdit",
    component: MachineEdit,
  },

  {
    path: "/plc-mapping-machine",
    meta: {
      isSecured: false,
    },
    name: "PLCMappingList",
    component: PLCMappingList,
  },
  {
    path: "/plc-mapping-machine-add",
    meta: {
      isSecured: false,
    },
    name: "PLCMappingAdd",
    component: PLCMappingAdd,
  },
  {
    path: "/plc-mapping-machine-edit/:id",
    meta: {
      isSecured: false,
    },
    name: "PLCMappingEdit",
    component: PLCMappingEdit,
  },

  {
    path: "/routing",
    meta: {
      isSecured: false,
    },
    name: "RoutingList",
    component: RoutingList,
  },
  {
    path: "/routing-add",
    meta: {
      isSecured: false,
    },
    name: "RoutingAdd",
    component: RoutingAdd,
  },
  {
    path: "/routing-edit/:rtg_id/:item_master_id",
    meta: {
      isSecured: false,
    },
    name: "RoutingEdit",
    component: RoutingEdit,
  },
  {
    path: "/time-card",
    meta: {
      isSecured: false,
    },
    name: "TimeCardList",
    component: TimeCardList,
  },
  {
    path: "/time-card/add",
    meta: {
      isSecured: false,
    },
    name: "TimeCardAdd",
    component: TimeCardAdd,
  },
  {
    path: "/time-card/:id/edit",
    meta: {
      isSecured: false,
    },
    name: "TimeCardEdit",
    component: TimeCardEdit,
  },
  {
    path: "/job",
    meta: {
      isSecured: false,
    },
    name: "JobList",
    component: JobList,
  },
  {
    path: "/job-tfms",
    meta: {
      isSecured: false,
    },
    name: "JobList",
    component: JobList_TFMS,
  },
  {
    path: "/time-card-report",
    meta: {
      isSecured: false,
    },
    name: "TimeCardReport",
    component: TimeCardReport,
  },
  {
    path: "/leader-time-card-report",
    meta: {
      isSecured: false,
    },
    name: "LeaderTimeCardReport",
    component: LeaderTimeCardReport,
  },
  {
    path: "/availability-dashboard",
    meta: {
      isSecured: false,
    },
    name: "AvailabilityDashboard",
    component: AvailabilityDashboard,
  },
  {
    path: "/productivity-dashboard",
    meta: {
      isSecured: false,
    },
    name: "ProductivityDashboard",
    component: ProductivityDashboard,
  },
  {
    path: "/quality-dashboard",
    name: "QualityDashboard",
    component: QualityDashboard,
  },
  {
    path: "/oee-dashboard",
    name: "OEEDashboard",
    component: OEEDashboard,
  },
  {
    path: "/forgot-reset-password/:id",
    name: "forgot-reset-password",
    component: ForgotResetPass,
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: ResetPass,
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPass,
  },
  {
    path: "/employee",
    meta: {
      isSecured: false,
    },
    name: "employee",
    component: Employee,
  },
  {
    path: "/group-menu",
    meta: {
      isSecured: false,
    },
    name: "group-menu",
    component: GroupMenu,
  },
  {
    path: "/menu-detail",
    meta: {
      isSecured: false,
    },
    name: "menu-detail",
    component: MenuDetail,
  },
  {
    path: "/setting-group-menu",
    meta: {
      isSecured: false,
    },
    name: "setting-group-menu",
    component: SettingGroupMenu,
  },
  {
    path: "/setting-menu-detail/:id",
    meta: {
      isSecured: false,
    },
    name: "setting-menu-detail",
    component: SettingMenuDetail,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/stock",
    name: "stock",
    component: Stock,
  },
  {
    path: "/stock-create",
    name: "stock-create",
    component: StockCreate,
  },
  {
    path: "/stock-edit/:id",
    name: "stock-edit",
    component: StockEdit,
  },
  {
    path: "/report",
    meta: {
      isSecured: true,
    },
    name: "report",
    component: Report,
  },
  {
    path: "/about",
    meta: {
      isSecured: false,
    },
    name: "about",
    component: About,
  },

  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "*",
    redirect: "/login",
  },
];

Vue.use(VueLoading, {
  color: "#254e58",
  loader: "dots",
  canCancel: false,
  width: 120,
  height: 120,
  backgroundColor: "#ffffff",
  opacity: 0.5,
  zIndex: 999,
});

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

let loader = null;

function hideLoader() {
  // destroy previous
  if (loader) {
    loader.hide();
    loader = null;
  }
}

function showLoader() {
  hideLoader();
  loader = Vue.$loading.show();
}
// Vue.prototype.$showLoader = showLoader
// Vue.prototype.$hideLoader = hideLoader
router.beforeEach((to, from, next) => {
  if (to.name) {
    showLoader();
  }
  Vue.prototype.$showLoader = showLoader;
  Vue.prototype.$hideLoader = hideLoader;
  next();
});

router.afterEach((to, from) => {
  showLoader();
  // setTimeout(() => {
  //   loader.hide()
  // }, 500)
});

export default router;
