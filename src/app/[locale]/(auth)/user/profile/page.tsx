import { getProfile } from "@/action/apiAction";
import React from "react";

async function getDataFromBarrer() {
  const req = await getProfile();
  return req;
}

export default async function ProfilePage() {
  const userData = await getDataFromBarrer();
  return (
    <>
      
    <section className="flex flex-col md:flex-row p-4 sm:p-6 md:p-8 mb-12 gap-6 md:gap-8">
  {/* Sidebar */}
  <aside className="bg-white rounded-lg shadow-md w-full md:w-64 flex flex-col items-center pt-12 pb-6 px-6">
    <div className="relative">
      <img
        alt="Profile picture of Nathaniel Poole"
        className="w-24 h-24 rounded-full object-cover border-4 border-white"
        src="https://storage.googleapis.com/a1aa/image/ba44c489-de91-426d-20e1-3e0d56e98f5f.jpg"
        width="96"
        height="96"
      />
      <div className="absolute bottom-0 right-0 bg-[#3b5dd8] border-2 border-white rounded-full w-6 h-6 flex items-center justify-center">
        <i className="fas fa-check-circle text-white text-sm" />
      </div>
    </div>
    <h3 className="mt-4 text-sm font-semibold text-[#1f2a56] text-center">
      Nathaniel Poole
    </h3>
    <p className="text-xs text-gray-400 text-center mt-1">Microsoft Inc.</p>

    <div className="mt-6 w-full space-y-3 text-xs text-gray-500">
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
    </div>
  </aside>

  {/* Main content */}
  <section className="flex-1 bg-white rounded-lg shadow-md p-6 min-w-0">
    <nav className="flex flex-wrap border-b border-gray-200 text-xs text-gray-400 mb-6 select-none">
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
    </nav>

    <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-xs text-[#1f2a56]">
      <div className="flex flex-col">
        <label className="mb-1 font-semibold">First Name</label>
        <input
          className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#3b5dd8]"
          id="firstName"
          type="text"
          value="Nathaniel"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Last Name</label>
        <input
          className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#3b5dd8]"
          id="lastName"
          type="text"
          value="Poole"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Phone Number</label>
        <input
          className="border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#3b5dd8]"
          id="phone"
          type="text"
          value="+1800-000"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Email address</label>
        <input
          className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#3b5dd8]"
          id="email"
          type="email"
          value="nathaniel.poole@microsoft.com"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-semibold">City</label>
        <select
          className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#3b5dd8]"
          id="city"
        >
          <option>Bridgeport</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-semibold">State/County</label>
        <input
          className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#3b5dd8]"
          id="state"
          type="text"
          value="WA"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Postcode</label>
        <select
          className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#3b5dd8]"
          id="postcode"
        >
          <option>31005</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Country</label>
        <select
          className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#3b5dd8]"
          id="country"
        >
          <option>United States</option>
        </select>
      </div>
      <div className="md:col-span-2 pt-4">
        <button
          className="bg-[#3b5dd8] text-white text-xs font-semibold rounded px-5 py-2 hover:bg-[#2a47c8] transition"
          type="submit"
        >
          Update
        </button>
      </div>
    </form>
  </section>
</section>

    </>
  );
}
