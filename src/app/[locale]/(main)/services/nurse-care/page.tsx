"use client";
import React, { useEffect, useState } from "react";
import NurseCard from "./component/nurseCard";
import { getNuresList } from "@/action/nurseApiAction";
import { getProfile } from "@/action/apiAction";
import NotUserRegisterPage from "../../../../component/general/notregister";
import LoadingPage from "@/app/component/general/Loading";

async function getDataFromBarrer() {
  const req = await getProfile();
  return req;
}

export default function Nursepage() {
  const [nurses, setNurses] = useState([]);
  const [register, setRegister] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getProfileInfo = async () => {
      const userData = await getDataFromBarrer();
      console.log("User Data nurse:", userData);
      if (!userData) {
        setRegister(false);
      }
    };
    getProfileInfo();
    const fetchNurses = async () => {
      const data = await getNuresList("");
      console.log("Nurses data:", data.nannies);
      setNurses(data.nannies || []);
      setLoading(false);
    };
    fetchNurses();
  }, []);

  if (loading) {
    return <LoadingPage />;
  } else {
    return (
      <>
        <div className="w-11/12 mx-auto justify-center space-x-5 pt-3  pb-3 grid grid-cols-1 lg:grid-cols-4  md:grid-cols-4  ">
          {nurses.map((nurse: any) => (
            <NurseCard
              key={nurse.id}
              image={
                "https://zippy.elrincondsabor.com/storage/app/public/" +
                  nurse.user.photo ||
                "https://www.cumbria.ac.uk/study/courses/undergraduate/childrens-nursing/ezgif.com-gif-maker-(13).webp"
              }
              title={nurse.translations[0].full_name || "Nurse Name"}
              description={nurse.fixed_package_description || "No description available."}
              isRegistered={register}
              phone={nurse.user.phone || "N/A"}
              email={nurse.user.email || "N/A"}
              id={nurse.id}
            />
          ))}
        </div>
      </>
    );
  }
}
