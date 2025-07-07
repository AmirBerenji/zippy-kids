import React from "react";
import LocalSwitcher from "../LocalSwitcher";
import Link from "next/link";

export default function ContactTopSide() {
  return (
    <>
      <div className="bg-[#e6f0f6] text-xs text-gray-600 flex justify-center sm:justify-between items-center px-4 sm:px-10 py-1 font-semibold">
        <div className="hidden sm:flex space-x-6">
          <div className="flex items-center space-x-1">
            <i className="fas fa-envelope"></i>
            <span>info@bubakids.edu.com</span>
          </div>
          {/* <div className="flex items-center space-x-1">
            <i className="fas fa-map-marker-alt"></i>
            <span>Address</span>
          </div> */}
          <div className="flex items-center space-x-1">
            <i className="fas fa-phone-alt"></i>
            <span>+1 800 770 000</span>
          </div>
        </div>
        <div className="flex space-x-4 text-gray-400 text-lg">
          <LocalSwitcher />
          <button aria-label="Search" className="hover:text-orange-400">
            <i className="fas fa-search"></i>
          </button>

          <Link href={"/user/login"}>
            <button aria-label="User Account" className="hover:text-orange-400">
              <i className="fas fa-user"></i>
            </button>
          </Link>

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
