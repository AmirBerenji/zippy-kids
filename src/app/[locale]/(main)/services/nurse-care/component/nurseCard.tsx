"use client";
import React, { useState } from "react";

interface Props {
  image: string;
  title: string;
  description: string;
  isRegistered?: boolean;
  phone?: string;
  email?: string;
}

export default function NurseCard(prop: Props) {
  const [isLoading, setLoading] = useState(true);

  // If not registered, apply blur class
  const blurClass = prop.isRegistered ? "" : " blur-xs select-none";

  return (
    <div className="rounded-lg shadow-md p-3 flex flex-col shadow-gray/20 hover:shadow-lg hover:shadow-[#ff9a5a]/40 transition-shadow duration-300 bg-white">
      <img
        alt="Friendly female nurse with stethoscope smiling and interacting with children in a bright clinic room"
        className="rounded-lg mb-4 w-50 h-50 object-cover m-auto"
        height="300"
        loading="lazy"
        src={prop.image}
        width="400"
      />
      <h3 className="text-xl font-semibold text-[#ff9a5a] mb-2 text-center">
        {prop.title}
      </h3>

      {/* Phone and Email with blur if not registered */}
      <p className={`text-[#2f3e4e] text-left`}>
        Phone: <span className={`${blurClass}`} > {prop.phone} </span>
      </p>
      <p className={`text-[#2f3e4e] text-left`}>
        Email: <span className={`${blurClass}`} >{prop.email} </span>
      </p>

      <p className="text-[#2f3e4e] text-left">
        Description: {prop.description}
      </p>
      <p className="w-full items-end justify-end flex">
        <button className="bg-[#ff9a5a] text-white px-4 py-2 rounded-lg mt-4 hover:bg-[#ff7a3a] transition-colors">
          More Info
        </button>
      </p>
    </div>
  );
}
