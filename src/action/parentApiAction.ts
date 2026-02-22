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

export async function updateChildProfile(childId: number, profile: FormData) {
  const req = await agent.ChildApi.getchildByuser();
  return req?.data;
  //const req = await agent.ChildApi.updateChildProfile(childId, profile);
  //return req;
}

export async function getChildById(childId: number) {
  const req = await agent.ChildApi.getchildByuser();
  return req?.data;
  //const req = await agent.ChildApi.getChildById(childId);
 // return req?.data;
}