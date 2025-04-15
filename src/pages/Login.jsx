'use client'

import { useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)

  let navigate = useNavigate();

  const isValidConfluxAddress = (address) => {
    // Basic Conflux address validation (0x followed by 40 hex characters)
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  const getAccountData = async (address) => {
    setLoading(true)
    try {
      // First validate the address format
      if (!isValidConfluxAddress(address)) {
        alert("Please enter a valid Conflux address (0x followed by 40 hex characters)")
        setLoading(false)
        return
      }

      const response = await fetch(
        `https://evmapi-testnet.confluxscan.net/api?module=account&action=balance&address=${address}`
      )

      if (!response.ok) {
        // If the account doesn't exist yet, we'll still allow login
        // as it might be a new address
        if (response.status === 404) {
          localStorage.setItem("Address", address)
          navigate("/home")
          return
        }
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      localStorage.setItem("Address", address)
      navigate("/home")
    } catch (error) {
      alert("Error fetching the account data. Please check the address and try again.")
      return
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    localStorage.setItem("Name", e.target.value)
  }

  const handleSearch = () => {
    if (inputValue === '') {
      alert("Please enter an address!")
      return
    }
    getAccountData(inputValue)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105">
          <div className="p-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Login with Conflux Address</h2>
            <div className="mb-6">
              <div className="relative">
                <input
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition duration-200 ease-in-out text-lg"
                  type="text"
                  id="myInput"
                  value={inputValue}
                  placeholder="Enter your Conflux address (0x...)"
                  onChange={handleInputChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            <button
              className={`w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Processing...
                </span>
              ) : (
                'LOGIN'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}