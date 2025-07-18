import React from "react";
import NurseCard from "./component/nurseCard";

export default function Nursepage() {
  return (
    <>
      <div className="w-11/12 mx-auto justify-center grid grid-cols-1 lg:grid-cols-4  md:grid-cols-4  ">
        <NurseCard />
        <NurseCard />
        <NurseCard />
        <NurseCard />
        <NurseCard />
        <NurseCard />
        <NurseCard />
      </div>
    </>
  );
}
