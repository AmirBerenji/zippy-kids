"use server";

import agent from "@/api/agent";

export async function checkChildId(childId: string) {
  const req = await agent.ChildApi.checkChildId(childId);
  return req?.data;
}
