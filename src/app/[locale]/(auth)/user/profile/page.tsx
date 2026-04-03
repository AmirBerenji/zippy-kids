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
import DoctorProfile from "./components/doctor/doctorprofile";
import ChildProfile from "./components/parent/childprofile";
import ChildList from "./components/parent/childlist";
import { getDoctorByUserId } from "@/action/doctorApiAction";
import { Doctor } from "@/model/doctor";

async function getDataFromBarrer() {
  const req = await getProfile();
  return req;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<Profile>();
  const [activeTab, setActiveTab] = useState("technicalInfo");
  const [nurseData, setNurseData] = useState<Nanny>();
  const [doctorData, setDoctorData] = useState<Doctor>();
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

  const handleEditChild = (childId: number) => {
    setSelectedChildId(childId);
    setActiveTab("parenttechnicalInfo");
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [profileData, nurseInfo, doctorInfo] = await Promise.all([
          getProfile(),
          getNuresByUserId(),
          getDoctorByUserId(),
        ]);
        setUserData(profileData);
        setNurseData(nurseInfo);
        setDoctorData(doctorInfo);

        if (!nurseInfo &&  profileData?.roles == "parent") {
          setActiveTab("parenttechnicalInfo");
        } else if (!nurseInfo && profileData?.roles == "doctor") {
          setActiveTab("doctortechnicalInfo");
        } else {
          setActiveTab("technicalInfo");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchAllData();
  }, []);

  return (
    <>
      {!nurseData && !doctorData && userData?.roles != "parent" && <DashboardTopMessage />}

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
            <NurseProfile userInfo={userData!} nurseInfo={nurseData} />
          ) : activeTab === "doctortechnicalInfo" ? (
            <DoctorProfile userInfo={userData!} />
          ) : activeTab === "parenttechnicalInfo" ? (
            <ChildProfile selectedChildId={selectedChildId} />
          ) : activeTab === "parentchildList" ? (
            <ChildList onEditChild={handleEditChild} />
          ) : (
            <>By</>
          )}
        </section>
      </section>
    </>
  );
}
