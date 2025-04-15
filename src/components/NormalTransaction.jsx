'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, ArrowUpRight } from 'lucide-react'

export default function NormalTransaction({ address }) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!address) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(
          `https://evmapi-testnet.confluxscan.net/api?module=account&action=txlist&address=${address}&page=1&offset=10&sort=asc`
        )
        const data = await response.json()
        console.log('Transaction data:', data)

        if (data.result === 'Max rate limit reached') {
          console.log("Rate limit reached")
          setError('Rate limit reached. Please try again later.')
          return
        }

        if (data.status === '1' && data.result) {
          setTransactions(data.result)
        } else {
          setTransactions([])
        }
      } catch (error) {
        console.error('Error fetching transactions:', error)
        setError('Failed to fetch transactions')
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [address])

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-12 text-white pb-2 tracking-tight leading-none">
          Normal Transactions
        </h2>
        <div className="bg-gray-900 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin h-8 w-8 text-purple-500" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center p-4">
              {error}
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center p-8">
              <p className="text-2xl font-bold text-gray-300">No transactions found</p>
              <p className="text-gray-400 mt-2">This address has no normal transactions</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Hash</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">From</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">To</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-700">
                  {transactions.map((transaction, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'} hover:bg-gray-700 transition-colors duration-200`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {transaction.hash.substring(0, 10)}...{transaction.hash.substring(transaction.hash.length - 8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {transaction.from.substring(0, 10)}...{transaction.from.substring(transaction.from.length - 8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {transaction.to.substring(0, 10)}...{transaction.to.substring(transaction.to.length - 8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {(Number(transaction.value) / 1e18).toFixed(4)} CFX
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a
                          href={`https://evmtestnet.confluxscan.net/tx/${transaction.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          View
                          <ArrowUpRight className="ml-1 h-4 w-4" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}