'use client'

import React, { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { X, DollarSign, LogOut, Droplet } from 'lucide-react'

function SideMenu({ isOpen, setIsOpen, logout, address }) {
  const [balance, setBalance] = useState(0)
  const name = localStorage.getItem("Name") || "User"
  const accountAddress = localStorage.getItem("Address")

  const checkBalance = async () => {
    try {
      const response = await fetch(
        `https://evmapi-testnet.confluxscan.net/api?module=account&action=balance&address=${accountAddress}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      if (data.result === 'Max rate limit reached') {
        console.log("Rate limit reached")
        return
      }

      const balance = Number(data.result) / 10**18
      setBalance(balance)
    } catch (error) {
      console.error('Error fetching balance:', error)
    }
  }

  useEffect(() => {
    if (isOpen) {
      checkBalance()
    }
  }, [isOpen])

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  const openFaucet = () => {
    window.open('https://www.alchemy.com/faucets/base-sepolia', '_blank')
  }

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <div className="fixed inset-0 overflow-hidden z-50">
        <Transition.Child
          as={React.Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsOpen(false)} />
        </Transition.Child>

        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <Transition.Child
            as={React.Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-xl overflow-y-scroll">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-2xl font-extrabold text-white">{name}</h2>
                    <div className="ml-3 h-7 flex items-center">
                      <button
                        className="bg-transparent rounded-md text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-6 relative flex-1 px-4 sm:px-6">
                  <div className="absolute inset-0 px-4 sm:px-6">
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <div className="bg-white rounded-2xl p-6 mb-6">
                          <h3 className="text-lg font-medium text-purple-600 mb-2">Wallet Address</h3>
                          <p className="text-sm text-gray-600 break-all">{accountAddress}</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 mb-6">
                          <h3 className="text-lg font-medium text-purple-600 mb-2">Balance</h3>
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-gray-900">{balance.toFixed(4)} CFX</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <button
                          onClick={openFaucet}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out flex items-center justify-center"
                        >
                          <Droplet className="h-5 w-5 mr-2" />
                          Get Faucet
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out flex items-center justify-center"
                        >
                          <LogOut className="h-5 w-5 mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition>
  )
}

export default SideMenu