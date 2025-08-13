import { Profile } from '@/model/auth'
import React from 'react'
interface Props {
    userInfo : Profile
}
export default function AccountSetting(prop:Props) {
  return (
<>
<form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-xs text-[#1f2a56]">
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-[#2f3e4e]">Full Name</label>
              <input
                className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="fullName"
                type="text"
                value={prop.userInfo.name}
              />
            </div>
            
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-[#2f3e4e]">Phone Number</label>
              <input
                className="border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="phone"
                type="text"
                value={prop.userInfo.phone}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-[#2f3e4e]">Email address</label>
              <input
                className="border disabled  border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="email"
                type="email"
                value={prop.userInfo.email}
              />
            </div>
{/* 
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-[#2f3e4e]">City</label>
              <select
                className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="city"
              >
                <option>Bridgeport</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-[#2f3e4e]">State/County</label>
              <input
                className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="state"
                type="text"
                value="WA"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-[#2f3e4e]">Postcode</label>
              <select
                className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="postcode"
              >
                <option>31005</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-[#2f3e4e]">Country</label>
              <select
                className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
                id="country"
              >
                <option>United States</option>
              </select>
            </div>
             */}
            <div className="md:col-span-2 pt-4">
              <button
                className="bg-[#fdb68a] text-white text-xs font-semibold rounded px-5 py-2 hover:bg-orange-400 transition"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
</>
  )
}
