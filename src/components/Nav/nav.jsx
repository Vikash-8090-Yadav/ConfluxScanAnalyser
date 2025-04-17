'use client'

import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import SideMenu from './Sidemenu'
import { Menu, X, LogOut } from 'lucide-react'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const accountAddress = localStorage.getItem("Address")

  const handleLogin = async () => {
    setLoading(true)
    localStorage.setItem("Address", "dummyAddress") // Simulating login
    setLoading(false)
    window.location.reload()
  }

  const logout = () => {
    alert("Logout")
    localStorage.clear()
    navigate('/')
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/home" className="flex-shrink-0">
              <span className="text-2xl font-bold text-white">Finder</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {!accountAddress ? (
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 rounded-full text-sm font-medium text-purple-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  {loading ? 'Loading...' : 'LOGIN'}
                </button>
              ) : null}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-purple-600 bg-opacity-20 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-white transition duration-300 ease-in-out"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {!accountAddress && (
              <button
                onClick={handleLogin}
                className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-purple-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out"
              >
                {loading ? 'Loading...' : 'LOGIN'}
              </button>
            )}
            {accountAddress && (
              <button
                onClick={logout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out"
              >
                <LogOut className="inline-block mr-2 h-5 w-5" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      {accountAddress && isOpen && (
        <SideMenu
          address={accountAddress}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          accountAddress={accountAddress}
          logout={logout}
          userInfo={accountAddress}
        />
      )}
    </nav>
  )
}