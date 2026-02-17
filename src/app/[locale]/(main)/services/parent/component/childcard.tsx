"use client";
import StarRating from "@/app/component/general/StarRating";
import { Child } from "@/model/child";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  child?: Child;
}

export default function childCard(prop: Props) {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  return (
    <div
      className="rounded-lg shadow-md p-3 flex flex-col lg:mx-2 md:mx-2
    shadow-gray/20 hover:shadow-lg 
    hover:shadow-[#ff9a5a]/40 
    transition-shadow duration-300 bg-white my-3  "
    >
      <Link href={`/services/nurse-care/${prop.id}/profile`}>
        <Image
          alt="Friendly female nurse with stethoscope smiling and interacting with children in a bright clinic room"
          className="rounded-lg mb-4 w-50 h-50 object-cover m-auto"
          height="300"
          loading="lazy"
          src={
            prop.child?.image
              ? "https://zippy.elrincondsabor.com/storage/app/public/" +
                prop.child.image
              : "/assets/images/kids-sample.jpg"
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

      <div>
        {/* <button
          className="mt-4 w-full bg-[#ff9a5a] text-white py-2 px-4 rounded hover:bg-[#e88b4f] transition-colors duration-300"
          onClick={() => {
            const childId = prop.child?.uuid;
            router.push(`/parent/${childId}`);
          }}
        >
          Edit Child
        </button> */}
      </div>
    </div>
  );
}
