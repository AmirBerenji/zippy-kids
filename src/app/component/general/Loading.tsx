import React from 'react'

export default function LoadingPage() {
  return (
   <div className="fixed inset-0 bg-slate-200 bg-opacity-55 flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-orange-500 text-xl font-semibold">Loading data...</div>
      </div>
    </div>
  )
}
