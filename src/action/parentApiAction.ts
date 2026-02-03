"use server";

import agent from "@/api/agent";
import { ChildFormData } from "@/model/child";

export async function checkChildId(childId: string) {
  const req = await agent.ChildApi.checkChildId(childId);
  return req?.data;
}

export async function getchildByToken(childId: string) {
  const req = await agent.ChildApi.getchildByToken(childId);
  return req?.data;
}

export async function addChildProfile(profile: FormData) {
  const req = await agent.ChildApi.addChildProfile(profile);
  return req;
}

export async function getChildrenByUser() {
  const req = await agent.ChildApi.getchildByuser();
  return req?.data;
}
