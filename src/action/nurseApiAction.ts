"use server";

import agent from "@/api/agent";


export async function getLocation() {
  const req = await agent.Location.getLocations()
  return req?.data;
}

export async function getLanguages(){
  const req = await agent.Language.getLanguage()
  return req?.data;
}


