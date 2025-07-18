import React from "react";
import Serviceheader from "./components/header";
import Link from "next/link";
import OurService from "./components/ourservice";

export default function Servicepage() {
  return (
    <>
      <Serviceheader />

      <OurService />

      <section className="bg-[#e6f0f6] text-white py-16 px-6 sm:px-12 md:px-20 lg:px-32 text-center">
        <h2 className="text-3xl font-extrabold mb-4 text-[#2f3e4e]">
          Join the <span className="text-[#ff9a5a]">Kidoo</span>Hub Family
        </h2>
        <p className="mb-2 max-w-3xl mx-auto text-lg text-[#2f3e4e]">
          Interested in Our Services?
        </p>
        <p className="mb-8 max-w-3xl mx-auto text-lg text-[#2f3e4e]">
          Contact us today to learn more or to schedule a consultation.
        </p>

        <Link
          href={"/contact"}
          className="inline-block bg-[#ff9a5a] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-orange-600 transition"
        >
          Contact Us
        </Link>
      </section>
    </>
  );
}
