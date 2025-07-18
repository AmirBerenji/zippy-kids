import Link from "next/link";
import React from "react";

interface Props {
  image: string;
  title: string;
  description: string;
  link: string;
}

export default function Service(prop: Props) {
  return (
    <Link
      href={prop.link}
      className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
    >
      <div className="">
        <img
          alt="Friendly female nurse with stethoscope smiling and interacting with children in a bright clinic room"
          className="rounded-lg mb-4 w-full h-48 object-cover"
          height="300"
          loading="lazy"
          src={prop.image}
          width="400"
        />
        <h3 className="text-xl font-semibold text-[#ff9a5a] mb-2">
          {prop.title}
        </h3>
        <p className="text-[#2f3e4e]">{prop.description}</p>
      </div>
    </Link>
  );
}
