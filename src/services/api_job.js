import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const listJobByStatus = async (status) => {
  let url = `${server.JOB}`
  if (status) {
    url += `?status=${status}`
  }
  return httpClient.get(url)
}

export const createJob = async (data) => {
  return httpClient.post(`${server.JOB}`, data)
}

export const updateJob = async (data) => {
  return httpClient.put(`${server.JOB}`, data)
}

export const createJobWorker = async (job_id, data) => {
  return httpClient.post(`${server.JOB}/${job_id}`, data)
}

export const removeJobWorker = async (job_id, job_worker_id) => {
  return httpClient.delete(`${server.JOB}/${job_id}/worker/${job_worker_id}`)
}

export const getLatestJob = async () => {
  return httpClient.get(`${server.JOB}/latest`)
}

export const getJobByMchandDatetime = async (data) => {
  return httpClient.post(`${server.JOB}/get/findjobbymch_idanddate_time`,data)
}