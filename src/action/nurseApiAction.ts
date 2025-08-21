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
  console.log("Nurse profile", profile);
  const req = await agent.Nurse.addNurseProfile(profile);
  console.log("Nurse profile response", req);
  return req?.data;
}
