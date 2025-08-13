"use client"
import { Profile } from '@/model/auth'
import React, { useEffect, useState } from 'react'

interface Props {
  userInfo: Profile
}

export default function AccountSetting({ userInfo }: Props) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Initialize state from props when component mounts
  useEffect(() => {
    if (userInfo) {
      setFullName(userInfo.name || '');
      setPhone(userInfo.phone || '');
      setEmail(userInfo.email || '');
    }
  }, [userInfo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Do something with updated values, like calling an API
    console.log({ fullName, phone, email });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-xs text-[#1f2a56]"
    >
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-[#2f3e4e]">Full Name</label>
        <input
          className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
  <label className="mb-1 font-semibold text-[#2f3e4e]">Phone Number</label>
  <input
    className="border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
    id="phone"
    type="text"
    inputMode="tel"
    value={phone}
    onChange={(e) => {
      let input = e.target.value;

      // Allow only digits and optional leading +
      if (/^(\+)?\d*$/.test(input)) {
        setPhone(input);
      }
    }}
  />
</div>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-[#2f3e4e]">Email Address</label>
        <input
          className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent"
          id="email"
          type="email"
          value={email}
          readOnly // Keep it read-only if the email shouldn't be changed
        />
      </div>

      <div className="md:col-span-2 pt-4">
        <button
          className="bg-[#fdb68a] text-white text-xs font-semibold rounded px-5 py-2 hover:bg-orange-400 transition"
          type="submit"
        >
          Update
        </button>
      </div>
    </form>
  );
}
