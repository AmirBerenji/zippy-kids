"use client";
import { getProfile } from "@/action/apiAction";
import React, { useEffect, useState } from "react";
import LeftProfileSide from "./components/LeftProfileSide";
import ProfileNavigation from "./components/ProfileNavigation";
import AccountSetting from "./components/AccountSetting";
import { Profile } from "@/model/auth";
import NurseProfile from "./components/nurse/nurseprofile";
import DashboardTopMessage from "@/app/component/general/DashboardTopMessage";
import { getNuresByUserId } from "@/action/nurseApiAction";
import { Nanny } from "@/model/nany";

async function getDataFromBarrer() {
  const req = await getProfile();
  return req;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<Profile>();
  const [activeTab, setActiveTab] = useState("account");
  const [nurseData, setNurseData] = useState<Nanny>();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [profileData, nurseInfo] = await Promise.all([
          getProfile(),
          getNuresByUserId(),
        ]);
        setUserData(profileData);
        setNurseData(nurseInfo);
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
      }
    };

    fetchAllData();
  }, []);

  return (
    <>
      {!nurseData && <DashboardTopMessage />}

      <section className="flex flex-col md:flex-row p-4 sm:p-6 md:p-8 mb-12 gap-6 md:gap-8">
        <LeftProfileSide userInfo={userData!} />

        <section className="flex-1 bg-white rounded-lg shadow-md p-6 min-w-0">
          <ProfileNavigation
            userInfo={userData!}
            onChangeTab={setActiveTab}
            activeTab={activeTab}
          />
          {activeTab === "account" ? (
            <AccountSetting userInfo={userData!} />
          ) : activeTab === "technicalInfo" ? (
            <NurseProfile userInfo={userData!} nurseInfo={nurseData!} />
          ) : (
            <>By</>
          )}
        </section>
      </section>
    </>
  );
}
