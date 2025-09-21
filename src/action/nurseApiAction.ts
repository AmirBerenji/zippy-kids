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
  console.log("profileNany", profile);
  const req = await agent.Nurse.addNurseProfile(profile);
  console.log("req", req);
  return req?.data;
}
export async function getNuresList(value: string) {
  const req = await agent.Nurse.getNurseList(value);
  return req?.data;
}
