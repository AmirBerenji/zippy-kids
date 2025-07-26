"use server";

import agent from "@/api/agent";


export async function getLocation() {
  const req = await agent.Location.getLocations()
  return req?.data;
}


