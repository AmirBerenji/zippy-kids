// action/doctorApiAction.ts
"use server";

import agent from "@/api/agent";
import { Doctor } from "@/model/doctor";

export async function getLocation() {
  const req = await agent.Location.getLocations();
  return req?.data;
}
export async function getLanguages() {
  const req = await agent.Language.getLanguage();
  return req?.data;
}

export async function addDoctorProfile(profile: Doctor) {
  console.log("AddDoctorProfileFormData", profile);
  const req = await agent.DoctorApi.addDoctorProfile(profile);
  return req?.data;
}

export async function getDoctorList(value: string) {
  console.log("GetDoctorListValue", value);
  const req = await agent.DoctorApi.getDoctorList(value);
  console.log("DoctorListreq", req);
  return req?.data;
}

export async function updateDoctorProfile(id: number, data: Doctor) {
  // Your API call implementation
}
