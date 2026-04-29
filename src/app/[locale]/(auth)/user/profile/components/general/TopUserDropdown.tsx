"use client";

import { useState } from "react";
import Link from "next/link";
import { User, ChevronDown, IdCard, LogOut, UserLock } from "lucide-react";
import { Profile } from "@/model/auth";
import { signOut } from "@/action/apiAction";
import { redirect } from "next/navigation";

interface Props {
  profile: Profile;
}

export default function TopUserDropdown(user: Props) {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    redirect("/user/login");
  };

  return (
    <div className="relative">
      {/* Dropdown trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center  space-x-2 text-[#ff9a5a] text-sm font-semibold"
      >
        <span>{user.profile.name}</span>
        <ChevronDown size={14} />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-1  w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50 text-sm ">
          <Link
            href="/"
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <IdCard size={16} />
            <span>Home</span>
          </Link>
          <hr className="border-t border-gray-200" />
          <Link
            href={`/user/change-password?id=${user.profile.id}`}
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            
            <UserLock size={16} />
            <span>Change password</span>
          </Link>
          <hr className="border-t border-gray-200" />
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
