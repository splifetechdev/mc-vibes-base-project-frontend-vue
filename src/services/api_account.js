import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

/// ------ reset pass,send email, old api ------

export const resetPassword = (id, data) => {
  return httpClient.put(server.ACCOUNT_URL + `/resetPassword/${id}`, data);
};

export const sendMailResetPassword = (data) => {
  return httpClient.post(server.ACCOUNT_URL + `/sendMailResetPassword`, data);
};

export const getUserByEmail = (email) => {
  return httpClient.get(server.ACCOUNT_URL + `/getUserByEmail/${email}`);
};

/// ------ reset pass,send email, old api ------

export const getAccounts = () => {
  return httpClient.get(server.ACCOUNT_URL + `/get`);
};

export const getAccountsByuserrole = (query) => {
  return httpClient.get(server.ACCOUNT_URL + `/getByuserrole`, query);
};

export const getAccountslist = () => {
  return httpClient.get(server.ACCOUNT_URL + `/get/list`);
};

export const getAccountslistActive = () => {
  return httpClient.get(server.ACCOUNT_URL + `/get/listactive`);
};

export const getAccountsByCompany = (id) => {
  return httpClient.get(server.ACCOUNT_URL + `/getaccountbycompany/${id}`);
};

export const getAccountid = (id) => {
  return httpClient.get(server.ACCOUNT_URL + `/${id}`);
};

export const getMyProfile = (id) => {
  return httpClient.get(server.ACCOUNT_URL + `/getMyProfile/${id}`);
};

export const getAccountByid = (id) => {
  return httpClient.get(server.ACCOUNT_URL + `/by/${id}`);
};

export const updateAccount = (id, data) => {
  return httpClient.put(server.ACCOUNT_URL + `/${id}`, data);
};

export const updateUserAccount = (id, data) => {
  return httpClient.put(server.ACCOUNT_URL + `/updateUserAccount/${id}`, data);
};

export const replaceUserAccount1 = (id, data) => {
  return httpClient.put(
    server.ACCOUNT_URL + `/replaceUserAccount1/${id}`,
    data
  );
};

export const replaceUserAccount2 = (id, data) => {
  return httpClient.put(
    server.ACCOUNT_URL + `/replaceUserAccount2/${id}`,
    data
  );
};

export const replaceUserAccount3 = (id, data) => {
  return httpClient.put(
    server.ACCOUNT_URL + `/replaceUserAccount3/${id}`,
    data
  );
};

export const deleteUserAccount = (id, data) => {
  return httpClient.put(server.ACCOUNT_URL + `/deleteUserAccount/${id}`, data);
};

export const getAuthorize = (id, router_path) => {
  return httpClient.get(
    server.ACCOUNT_URL + `/getAuthorize/${id}/${router_path}`
  );
};

export const createAccount = (data) => {
  return httpClient.post(server.ACCOUNT_URL + "/register", data);
};

export const addUserAccount = (data) => {
  return httpClient.post(server.ACCOUNT_URL + "/addUserAccount", data);
};

export const deleteAccount = (id) => {
  return httpClient.delete(server.ACCOUNT_URL + `/${id}`);
};

export const getAccountDetail = (id) => {
  return httpClient.get(server.ACCOUNT_URL + `/${id}`);
};

export const ChangeapprovalUserAccount = (data) => {
  return httpClient.post(server.ACCOUNT_URL + `/changeapprovaluser`,data);
};

export const import_Employee = (data) => {
  return httpClient.post(server.ACCOUNT_URL + `/import_employee`,data);
};
