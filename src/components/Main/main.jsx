'use client'

import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import NormalTransaction from '../NormalTransaction'
import InternalTransaction from '../InternalTransaction'

export default function Main() {
  const [activeTab, setActiveTab] = useState(null)
  const navigate = useNavigate()
  const accountAddress = localStorage.getItem("Address")

  useEffect(() => {
    if (!accountAddress) {
      window.location.reload()
    }
  }, [accountAddress])

  const handleTabChange = (tab) => {
    setActiveTab(tab === activeTab ? null : tab)
  }

  if (!accountAddress) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-white pb-2 tracking-tight leading-none animate-fade-in-down">
          Transaction Explorer
        </h1>

        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white border-opacity-20 animate-fade-in-up">
          <div className="flex justify-center p-4">
            <div className="bg-gray-800 bg-opacity-50 rounded-2xl p-1 flex">
              <button
                onClick={() => handleTabChange('normal')}
                className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ease-in-out ${
                  activeTab === 'normal'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                Normal Txn
              </button>
              <button
                onClick={() => handleTabChange('internal')}
                className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ease-in-out ${
                  activeTab === 'internal'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                Internal Txn
              </button>
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'normal' && (
        <div className="mt-12 animate-fade-in">
          <NormalTransaction address={accountAddress} />
        </div>
      )}

      {activeTab === 'internal' && (
        <div className="mt-12 animate-fade-in">
          <InternalTransaction />
        </div>
      )}
    </div>
  )
}