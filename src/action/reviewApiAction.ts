import agent from "@/api/agent";

export async function getNurseReviews() {
  const req = await agent.Location.getLocations();
  return req?.data;
}
export async function checkNurseReview() {
  const req = await agent.Location.getLocations();
  return req?.data;
}

export async function submitNurseReview() {
  const req = await agent.Location.getLocations();
  return req?.data;
}
export async function updateReview() {
  const req = await agent.Location.getLocations();
  return req?.data;
}

export async function deleteReview() {
  const req = await agent.Location.getLocations();
  return req?.data;
}
