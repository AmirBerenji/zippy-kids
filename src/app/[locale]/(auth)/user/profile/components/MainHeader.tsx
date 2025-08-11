import { Profile } from '@/model/auth';
import React from 'react'

interface Props {
  user: Profile;
}


export default function MainHeader(prop:Props) {
  return (
     <header className="flex items-center justify-between h-14 px-6 border-b border-gray-200 text-sm text-[#1f2a56]">
     <div>
      Profile
     </div>
     <div className="flex items-center gap-6">
      <button aria-label="Notifications" className="relative text-gray-400 hover:text-[#1f2a56] transition-colors">
       <i className="fas fa-bell text-lg">
       </i>
       <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
        2
       </span>
      </button>
      <div className="flex items-center gap-2 cursor-pointer select-none">
       <img alt="Profile picture of Nathaniel Poole, a middle-aged man with glasses and short hair" className="w-8 h-8 rounded-full object-cover" height="32" src="https://storage.googleapis.com/a1aa/image/ba44c489-de91-426d-20e1-3e0d56e98f5f.jpg" width="32"/>
       <span className="text-sm text-[#1f2a56] font-semibold">
        {prop.user.name}
       </span>
       <i className="fas fa-chevron-down text-xs text-gray-400">
       </i>
      </div>
     </div>
    </header>
  )
}
