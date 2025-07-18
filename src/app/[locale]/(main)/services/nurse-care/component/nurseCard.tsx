"use client"
import React, { useState } from 'react'
import Image from "next/image";


export default function NurseCard() {
    const [isLoading, setLoading] = useState(true);
  return (
    <>
      <div
        className="w-full p-3 pt-24">
        <div
          className=" h-[360px]  w-full    rounded-md   
      bg-clip-border text-[#ff9a5a]
      shadow-md border border-blue-gray-100 "
        >
          <div
            className="shadow-lg 
        rounded-full h-56 w-56 bg-white
         -mt-20 m-auto border-4 border-blue-gray-100"
          >

              <Image
                src="/assets/images/service/our-service.jpg"
                alt=""
                width="10"
                height="10"
                priority
                className={` 
                            object-cover
                            group-hover:opacity-75
                            duration-700
                            ease-in-out
                            w-55 h-55
                            shadow-md
                            border
                            -mt-0.5
                            ${
                              isLoading
                                ? "rounded-full grayscale blur-xl scale-150"
                                : "rounded-full grayscale-0 blur-0 scale-100"
                            }
                            `}
                sizes="(max-width:700px) 100vw, (max-width: 1200px) 50vw, 25vw"
                onLoadingComplete={() => setLoading(false)}
              />

          </div>
          <div className="p-2 text-center">
            <h4 className="mb-1  whitespace-nowrap overflow-hidden text-ellipsis uppercase font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              
            </h4>
            <hr></hr>
            <div className="grid grid-cols-1 text-left p-3 text-gray-400 text-1xl  ">
              <div>Name: </div>
              <div>Location: </div>
              <div>Gender: </div>
            </div>
            <hr></hr>
            
          </div>
        </div>
      </div>
    </>
  )
}
 