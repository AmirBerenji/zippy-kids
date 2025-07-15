
import React from "react";
import LocalSwitcher from "../LocalSwitcher";
import Link from "next/link";
import { getProfile } from "@/action/apiAction";


async function getDataFromBarrer()
{
  const req = await getProfile()
}

export default async function ContactTopSide() {
    const userData = await getDataFromBarrer();
  return (
    <>
      <div className="bg-[#e6f0f6] text-xs text-gray-600 flex justify-center sm:justify-between items-center px-4 sm:px-10 py-1 font-semibold">
        <div className="hidden sm:flex space-x-6">
          <div className="flex items-center space-x-1">
            <i className="fas fa-envelope"></i>
            <span>kidoohubarmenia@gmail.com</span>
          </div>
          {/* <div className="flex items-center space-x-1">
            <i className="fas fa-map-marker-alt"></i>
            <span>Address</span>
          </div> */}
          <div className="flex items-center space-x-1">
            <i className="fas fa-phone-alt"></i>
            <span>+374 96 882655 | +374 55 882658clear </span>
          </div>
        </div>
        <div className="flex space-x-4 text-gray-400 text-lg">
          <LocalSwitcher />
          <button aria-label="Search" className="hover:text-orange-400">
            <i className="fas fa-search"></i>
          </button>

           {userData == undefined ? (
              <>
              <Link href={"/user/login"}>
                          <button aria-label="User Account" className="hover:text-orange-400">
                            <i className="fas fa-user"></i>
                          </button>
                        </Link>
              </>

           ) :(<>
            <div>Hello</div>
           </>)} 

          {/* <button aria-label="Shopping Cart" className="hover:text-orange-400 relative">
            <i className="fas fa-shopping-cart">
            </i>
            
                
            <span className="absolute top-0 -right-2 bg-orange-400 text-white text-[10px] font-bold rounded-full px-[5px]">
              0
            </span>
          </button> */}
        </div>
      </div>
    </>
  );
}
