"use client"
import React from 'react'

export default function NurseAddpage() {
    
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 gap-5'>
        <input
            autoComplete="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
            id="email1"
            name="email1"
            placeholder="you@example.com"
            type="email"
        />
        <input
            autoComplete="off"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
            id="email2"
            name="email2"
            placeholder="you@example.com"
            type="text"
        />
        <input
            autoComplete="off"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
            id="email3"
            name="email3"
            placeholder="you@example.com"
            type="text"
        />
        <input
            autoComplete="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
            id="email1"
            name="email1"
            placeholder="you@example.com"
            type="email"
        />
        <input
            autoComplete="off"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
            id="email2"
            name="email2"
            placeholder="you@example.com"
            type="text"
        />
        <input
            autoComplete="off"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb68a] focus:border-transparent transition"
            id="email3"
            name="email3"
            placeholder="you@example.com"
            type="text"
        />
</div>
  )
}
