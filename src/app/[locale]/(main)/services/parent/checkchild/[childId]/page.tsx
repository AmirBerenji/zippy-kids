'use client'

import React from 'react'
import { useParams } from 'next/navigation'

export default function CheckChildPage() {
    const params = useParams()
    const childId = params.childId as string

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Child Profile</h1>
                    
                    <div className="space-y-4">
                        <div className="border-b pb-4">
                            <p className="text-gray-600">Child ID: <span className="font-semibold text-gray-800">{childId}</span></p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h2 className="font-semibold text-blue-900 mb-2">Activity Status</h2>
                                <p className="text-gray-700">Loading activity data...</p>
                            </div>
                            
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h2 className="font-semibold text-green-900 mb-2">Progress</h2>
                                <p className="text-gray-700">Loading progress data...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}