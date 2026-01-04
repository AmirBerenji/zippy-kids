"use server";

import agent from "@/api/agent";
import { ChildFormData } from "@/model/child";

export async function checkChildId(childId: string) {
  const req = await agent.ChildApi.checkChildId(childId);
  return req?.data;
}

export async function addChildProfile(profile: FormData) {
  console.log("addChildProfile profile:", profile);
  const req = await agent.ChildApi.addChildProfile(profile);
  console.log("addChildProfile req:", req);
  return req?.data;
}
