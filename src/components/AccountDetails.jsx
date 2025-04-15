import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export default function AccountDetails({ address }) {
  const [accountData, setAccountData] = useState({
    balance: null,
    transactions: [],
    internalTransactions: [],
    tokenTransfers: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        // Fetch account balance
        const balanceResponse = await fetch(
          `https://evmapi-testnet.confluxscan.net/api?module=account&action=balance&address=${address}`
        )
        const balanceData = await balanceResponse.json()

        // Fetch transactions
        const txResponse = await fetch(
          `https://evmapi-testnet.confluxscan.net/api?module=account&action=txlist&address=${address}`
        )
        const txData = await txResponse.json()

        // Fetch internal transactions
        const internalTxResponse = await fetch(
          `https://evmapi-testnet.confluxscan.net/api?module=account&action=txlistinternal&address=${address}`
        )
        const internalTxData = await internalTxResponse.json()

        // Fetch token transfers
        const tokenTxResponse = await fetch(
          `https://evmapi-testnet.confluxscan.net/api?module=account&action=tokentx&address=${address}`
        )
        const tokenTxData = await tokenTxResponse.json()

        setAccountData({
          balance: balanceData.result,
          transactions: txData.result || [],
          internalTransactions: internalTxData.result || [],
          tokenTransfers: tokenTxData.result || []
        })
      } catch (err) {
        setError('Failed to fetch account data')
        console.error('Error fetching account data:', err)
      } finally {
        setLoading(false)
      }
    }

    if (address) {
      fetchAccountData()
    }
  }, [address])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-purple-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Balance</h3>
        <p className="text-2xl font-bold text-purple-600">
          {accountData.balance ? `${(accountData.balance / 1e18).toFixed(4)} CFX` : '0 CFX'}
        </p>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {accountData.transactions.slice(0, 5).map((tx, index) => (
            <div key={index} className="border-b pb-2">
              <p className="text-sm text-gray-600">Hash: {tx.hash}</p>
              <p className="text-sm text-gray-600">From: {tx.from}</p>
              <p className="text-sm text-gray-600">To: {tx.to}</p>
              <p className="text-sm text-gray-600">Value: {(tx.value / 1e18).toFixed(4)} CFX</p>
            </div>
          ))}
        </div>
      </div>

      {/* Internal Transactions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Internal Transactions</h3>
        <div className="space-y-4">
          {accountData.internalTransactions.slice(0, 5).map((tx, index) => (
            <div key={index} className="border-b pb-2">
              <p className="text-sm text-gray-600">Hash: {tx.hash}</p>
              <p className="text-sm text-gray-600">From: {tx.from}</p>
              <p className="text-sm text-gray-600">To: {tx.to}</p>
              <p className="text-sm text-gray-600">Value: {(tx.value / 1e18).toFixed(4)} CFX</p>
            </div>
          ))}
        </div>
      </div>

      {/* Token Transfers */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Token Transfers</h3>
        <div className="space-y-4">
          {accountData.tokenTransfers.slice(0, 5).map((tx, index) => (
            <div key={index} className="border-b pb-2">
              <p className="text-sm text-gray-600">Hash: {tx.hash}</p>
              <p className="text-sm text-gray-600">Token: {tx.tokenSymbol}</p>
              <p className="text-sm text-gray-600">From: {tx.from}</p>
              <p className="text-sm text-gray-600">To: {tx.to}</p>
              <p className="text-sm text-gray-600">Value: {tx.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 