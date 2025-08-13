import { Profile } from "@/model/auth";
import React from "react";

interface Props {
  userInfo: Profile;
}

export default function ProfileNavigation(prop: Props) {
  return (
    <>
      <nav className="flex flex-wrap border-b border-gray-200 text-xs text-gray-400 mb-6 select-none">
        {prop.userInfo.roles == "parent" ? (
          <>
            <button className="border-b-2 border-[#3b5dd8] text-[#3b5dd8] font-semibold pb-2 mr-4 mb-2">
              Account Settings
            </button>
          </>
        ) : (
          <>
            <button className="border-b-2 border-[#3b5dd8] text-[#3b5dd8] font-semibold pb-2 mr-4 mb-2">
              Account Settings
            </button>
            <button className="mr-4 mb-2 hover:text-[#3b5dd8] transition-colors">
              Company Settings
            </button>
            <button className="mr-4 mb-2 hover:text-[#3b5dd8] transition-colors">
              Documents
            </button>
            <button className="mr-4 mb-2 hover:text-[#3b5dd8] transition-colors">
              Billing
            </button>
            <button className="mb-2 hover:text-[#3b5dd8] transition-colors">
              Notifications
            </button>
          </>
        )}
      </nav>
    </>
  );
}
