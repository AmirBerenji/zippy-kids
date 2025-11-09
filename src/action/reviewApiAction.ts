import agent from "@/api/agent";

export async function getNurseReviews(id: Number,page: Number) {
  const req = await agent.Location.getLocations();
  return req?.data;
}
export async function checkNurseReview(id:Number) {
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
