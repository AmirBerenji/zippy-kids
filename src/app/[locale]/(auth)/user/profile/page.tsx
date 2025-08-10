import { getProfile } from "@/action/apiAction";
import React from "react";

async function getDataFromBarrer() {
  const req = await getProfile();
  console.log("Profile data:", req);
  return req;
}

export default async function ProfilePage() {
  const userData = await getDataFromBarrer();
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">{userData.name}</h1>
        <h1 className="text-2xl font-bold mb-4">{userData.email}</h1>
        <h1 className="text-2xl font-bold mb-4">{userData.roles[0]}</h1>
      </div>
    </>
  );
}
