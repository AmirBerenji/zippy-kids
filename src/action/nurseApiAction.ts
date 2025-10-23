"use server";

import agent from "@/api/agent";
import { Nanny } from "@/model/nany";

export async function getLocation() {
  const req = await agent.Location.getLocations();
  return req?.data;
}
export async function getLanguages() {
  const req = await agent.Language.getLanguage();
  return req?.data;
}
export async function addNuresProfile(profile: Nanny) {
  const req = await agent.Nurse.addNurseProfile(profile);
  console.log("AddNurseProfileReq", req);
  return req?.data;
}
export async function getNuresList(value: string) {
  const req = await agent.Nurse.getNurseList(value);
  console.log("NurseListreq", req);
  return req?.data;
}
export async function getNuresById(id: number) {
  const req = await agent.Nurse.getNurseById(id);
  console.log("NurseByIdreq", req);
  return req?.data;
}
export async function getNuresByUserId() {
  const req = await agent.Nurse.getNurseByUserId();
  console.log("NurseByUserIdreq", req);
  return req?.data;
}

export async function updateNuresProfile(id: number, profile: Nanny) {
  console.log("UpdateNurseProfile", id, profile);
  const req = await agent.Nurse.updateNurseProfile(profile);
  console.log("UpdateNurseProfileReq", req);
  return req?.data;
}
