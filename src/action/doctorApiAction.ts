// action/doctorApiAction.ts
"use server";

import agent from "@/api/agent";
import { Doctor, DoctorDetails } from "@/model/doctor";
import { ApiResponse } from "@/model/general";

export async function getLocation() {
  const req = await agent.Location.getLocations();
  return req?.data;
}

export async function getLanguages() {
  const req = await agent.Language.getLanguage();
  return req?.data;
}

export async function addDoctorProfile(profile: Doctor) {
  const req = await agent.DoctorApi.addDoctorProfile(profile);
  return req?.data;
}

export async function getDoctorList(value: string) {
  const req = await agent.DoctorApi.getDoctorList(value);
  return req?.data;
}

/**
 * Same call as `getDoctorList`, but returns the whole envelope — `pagination`
 * sits next to `data` on this endpoint, so unwrapping it here loses the pages.
 */
export async function getDoctorListPage(
  page: number,
): Promise<ApiResponse<DoctorDetails> | undefined> {
  return await agent.DoctorApi.getDoctorList(`page=${page}`);
}

export async function updateDoctorProfile(id: number, data: Doctor) {
  const req = await agent.DoctorApi.updateDoctorProfile(data);
  return req?.data;
}

export async function getDoctorProfile(id: number) {
  const req = await agent.DoctorApi.getDoctorProfile(id);
  return req?.data;
}

export async function getDoctorByUserId() {
  const req = await agent.DoctorApi.getDoctorByUserId();
  return req?.data;
}
