import { getProfile } from "@/action/apiAction";
import React from "react";
import LeftProfileSide from "./components/LeftProfileSide";
import ProfileNavigation from "./components/ProfileNavigation";
import AccountSetting from "./components/AccountSetting";


async function getDataFromBarrer() {
  const req = await getProfile();
  return req;
}

export default async function ProfilePage() {
  const userData = await getDataFromBarrer();
  return (
    <>
    <section className="flex flex-col md:flex-row p-4 sm:p-6 md:p-8 mb-12 gap-6 md:gap-8">

        <LeftProfileSide userInfo={userData}/>

        <section className="flex-1 bg-white rounded-lg shadow-md p-6 min-w-0">
          <ProfileNavigation userInfo={userData} />
          <AccountSetting userInfo={userData}/>
        </section>
    </section>

    </>
  );
}
