import React from 'react'

export default function LoadingPage() {
  return (
   <div className="fixed inset-0 bg-slate-200 bg-opacity-55 flex items-center justify-center z-50">
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fdb68a]"></div>
      </div>
    </div>
  )
}
