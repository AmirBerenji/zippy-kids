"use client";
import React, { useState } from "react";
import Image from "next/image";

interface Props {
  image: string;
  title: string;
  description: string;
}

export default function NurseCard(prop: Props) {
  const [isLoading, setLoading] = useState(true);
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col  ">
        <img
          alt="Friendly female nurse with stethoscope smiling and interacting with children in a bright clinic room"
          className="rounded-lg mb-4 w-full h-48 object-cover"
          height="300"
          loading="lazy"
          src={prop.image}
          width="400"
        />
        <h3 className="text-xl font-semibold text-[#ff9a5a] mb-2 text-center ">
          {prop.title}
        </h3>
        <p className="text-[#2f3e4e] text-left">Phone: +3749958888888</p>
        <p className="text-[#2f3e4e] text-left">Email: test@gmail.com</p>
        <p className="text-[#2f3e4e] text-left">
          Description: {prop.description}
        </p>
        <p className="w-full items-end justify-end flex">
          <button className="bg-[#ff9a5a] text-white px-4 py-2 rounded-lg mt-4 hover:bg-[#ff7a3a] transition-colors">
            More Info
          </button>
        </p>
      </div>
    </>
  );
}
