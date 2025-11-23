import StarRating from "@/app/component/general/StarRating";
import { Link } from "lucide-react";
import React from "react";

interface Props {
  id: number;
  image: string;
  title: string;
  description: string;
  isRegistered?: boolean;
  phone?: string;
  email?: string;
}

export default function DoctorCard(prop: Props) {
  // If not registered, apply blur class
  const blurClass = prop.isRegistered ? "" : " blur-xs select-none";

  return (
    <div
      className="rounded-lg shadow-md p-3 flex flex-col 
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
          src={prop.image}
          width="400"
        />
        <h3 className="text-xl font-semibold text-[#ff9a5a] mb-2 text-center">
          {prop.title}
        </h3>
      </Link>
      {/* Phone and Email with blur if not registered */}
      <p className={`text-[#2f3e4e] text-left`}>
        Phone: <span className={`${blurClass}`}> {prop.phone} </span>
      </p>
      <p className={`text-[#2f3e4e] text-left`}>
        Email: <span className={`${blurClass}`}>{prop.email} </span>
      </p>

      <p className="text-[#2f3e4e] text-left">
        Description: {prop.description}
      </p>

      <p className="w-full items-center  justify-between flex mt-3 ">
        <StarRating rating={3.6} reviewCount={232} size="sm" />
        {prop.isRegistered ? (
          <Link
            href={`/services/doctor/${prop.id}/profile`}
            className="bg-[#ff9a5a] text-white px-4 py-2 rounded-lg mt-0 hover:bg-[#ff7a3a] transition-colors"
          >
            More Info
          </Link>
        ) : (
          <Link
            href={`/notregister`}
            className="bg-[#ff9a5a] text-white px-4 py-2 rounded-lg mt-0 hover:bg-[#ff7a3a] transition-colors"
          >
            More Info
          </Link>
        )}
      </p>
    </div>
  );
}
