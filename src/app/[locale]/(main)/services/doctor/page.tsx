"use client";
import { getProfile } from "@/action/apiAction";
import { getDoctorList } from "@/action/doctorApiAction";
import ComingSoonPage from "@/app/component/general/commingsoon";
import LoadingPage from "@/app/component/general/Loading";
import { DoctorDetails } from "@/model/doctor";
import React, { useEffect, useState } from "react";
import DoctorCard from "./component/doctorCard";

async function getDataFromBarrer() {
  const req = await getProfile();
  return req;
}

export default function Doctorpage() {
  const [doctors, setDoctors] = useState<DoctorDetails[]>([]);
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
      const data = await getDoctorList("");
      console.log("Doctors data:", data);
      setDoctors(data || []);
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
          {doctors.map((doctor: any) => (
            <>
              <DoctorCard
                key={doctor.id}
                id={doctor.id}
                description={doctor.bio}
                phone={doctor.phone}
                title={doctor.specialization}
                image={
                  "https://zippy.elrincondsabor.com/storage/app/public/" +
                    doctor.user.photo ||
                  "https://www.cumbria.ac.uk/study/courses/undergraduate/childrens-nursing/ezgif.com-gif-maker-(13).webp"
                }
                email={doctor.email}
                isRegistered={register}
              />
            </>
          ))}
        </div>
      </>
    );
  }
}
