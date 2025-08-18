import { Profile } from "@/model/auth";
import React from "react";

interface Props {
  userInfo: Profile;
}

export default function LeftProfileSide(prop: Props) {
  return (
    <>
      <aside className="bg-white rounded-lg shadow-md w-full md:w-64 flex flex-col items-center pt-12 pb-6 px-6">
        <div className="relative">
          <img
            alt="Profile picture of Nathaniel Poole"
            className="w-24 h-24 rounded-full object-cover border-4 border-white"
            src="https://storage.googleapis.com/a1aa/image/ba44c489-de91-426d-20e1-3e0d56e98f5f.jpg"
            width="96"
            height="96"
          />
          {/* <div className="absolute bottom-0 right-0 bg-[#3b5dd8] border-2 border-white rounded-full w-6 h-6 flex items-center justify-center">
        <i className="fas fa-check-circle text-white text-sm" />
      </div> */}
        </div>
        <h3 className="mt-4 text-sm font-semibold text-[#1f2a56] text-center">
          {prop.userInfo?.name}
        </h3>
        <p className="text-xs text-gray-400 text-center mt-1">
          {prop.userInfo?.roles[0].toUpperCase()}
        </p>
        <p className="text-xs text-gray-400 text-center mt-1">
          {prop.userInfo?.email}
        </p>

        {/* <div className="mt-6 w-full space-y-3 text-xs text-gray-500">
      <div className="flex justify-between border-b border-gray-100 pb-1">
        <span>Opportunities applied</span>
        <span className="text-[#fbbf24] font-semibold">32</span>
      </div>
      <div className="flex justify-between border-b border-gray-100 pb-1">
        <span>Opportunities won</span>
        <span className="text-[#22c55e] font-semibold">26</span>
      </div>
      <div className="flex justify-between">
        <span>Current opportunities</span>
        <span>6</span>
      </div>
    </div>

    <button
      className="mt-6 w-full border border-gray-200 rounded text-xs text-gray-500 py-2 hover:bg-gray-50 transition"
      type="button"
    >
      View Public Profile
    </button>

    <div
      className="mt-3 w-full border border-gray-200 rounded px-3 py-1 text-xs text-[#3b5dd8] truncate cursor-pointer select-text"
      title="https://app.ahireground.com/profile/nathanielpoole"
    >
      https://app.ahireground.com/profile/nathanielpoole
      <i className="fas fa-copy ml-2 text-gray-400" />
    </div> */}
      </aside>
    </>
  );
}
