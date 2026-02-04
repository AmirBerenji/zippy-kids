"use client";
import StarRating from "@/app/component/general/StarRating";
import { Child } from "@/model/child";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  id: number;
  child?: Child;
}

export default function childCard(prop: Props) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div
      className="rounded-lg shadow-md p-3 flex flex-col lg:mx-2 md:mx-2
    shadow-gray/20 hover:shadow-lg 
    hover:shadow-[#ff9a5a]/40 
    transition-shadow duration-300 bg-white my-3  "
    >
      <Link href={`/services/nurse-care/${prop.id}/profile`}>
        <img
          alt="Friendly female nurse with stethoscope smiling and interacting with children in a bright clinic room"
          className="rounded-lg mb-4 w-50 h-50 object-cover m-auto"
          height="300"
          loading="lazy"
          src={
            "https://zippy.elrincondsabor.com/storage/app/public/" +
            prop.child?.image
          }
          width="400"
        />
        <h3 className="text-xl font-semibold text-[#ff9a5a]  text-center">
          {prop.child?.name} {prop.child?.last_name}
        </h3>
        <h3 className="text-xs font-semibold text-[#70777e] mb-2 text-center">
          {prop.child?.gender}
        </h3>
      </Link>
      {/* Phone and Email with blur if not registered */}
      <p className={`text-[#2f3e4e] text-left`}>
        Birthday: {prop.child?.birthday}
      </p>
      <p className={`text-[#2f3e4e] text-left`}>
        Blod type: {prop.child?.blood_type}
      </p>

      <p className="text-[#2f3e4e] text-left">Address: {prop.child?.address}</p>
    </div>
  );
}
