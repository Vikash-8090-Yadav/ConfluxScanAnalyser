import React, { useState, useEffect } from 'react';
import NormalTransaction from './NormalTransaction';
import InternalTransaction from './InternalTransaction';
import TokenTransfers from './TokenTransfers';
import { LogOut, Droplet, Copy, User } from 'lucide-react';

function truncateAddress(address) {
  if (!address) return '';
  return address.substring(0, 6) + '...' + address.substring(address.length - 4);
}

function Identicon({ address }) {
  // Simple colored circle as placeholder identicon
  const color = address ? `#${address.slice(2, 8)}` : '#888';
  return (
    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white border-2 border-purple-400" style={{ backgroundColor: color }}>
      <User className="text-purple-600" />
    </div>
  );
}

export default function AccountDashboard({ address, onLogout }) {
  const [activeTab, setActiveTab] = useState('normal');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [accountData, setAccountData] = useState({ balance: null });

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(
          `https://evmapi-testnet.confluxscan.net/api?module=account&action=balance&address=${address}`
        );
        const data = await response.json();
        setAccountData({ balance: data.result || '0' });
      } catch (error) {
        console.error('Error fetching balance:', error);
        setAccountData({ balance: '0' });
      }
    };

    if (address) {
      fetchBalance();
    }
  }, [address]);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Sidebar content
  const Sidebar = (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 p-6 text-white w-72 min-w-[16rem] shadow-2xl">
      <div className="flex flex-col items-center mb-8">
        <Identicon address={address} />
        <div className="mt-4 text-lg font-bold">{truncateAddress(address)}</div>
        <button
          onClick={handleCopy}
          className="mt-2 flex items-center px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm hover:bg-opacity-30 transition text-gray-800 font-medium"
        >
          <Copy className="h-4 w-4 mr-1 text-gray-800" />
          {copied ? 'Copied!' : 'Copy Address'}
        </button>
      </div>
      <div className="bg-white bg-opacity-80 rounded-2xl p-4 mb-6 text-purple-700 text-center">
        <div className="text-xs font-semibold mb-1">Balance</div>
        <div className="text-2xl font-bold text-gray-800">
          {accountData?.balance ? `${(Number(accountData.balance) / 1e18).toFixed(4)} CFX` : '0 CFX'}
        </div>
      </div>
      <button
        onClick={() => window.open('https://efaucet.confluxnetwork.org/', '_blank')}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out flex items-center justify-center mb-3"
      >
        <Droplet className="h-5 w-5 mr-2" />
        Get Faucet
      </button>
      <button
        onClick={onLogout}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out flex items-center justify-center"
      >
        <LogOut className="h-5 w-5 mr-2" />
        Logout
      </button>
      <div className="flex-1" />
      <div className="text-xs text-white/60 mt-8 text-center">ConfluxScan Explorer UI</div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-sans">
      {/* Sidebar for desktop */}
      <div className="hidden md:block h-full sticky top-0 left-0">{Sidebar}</div>
      {/* Sidebar toggle for mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white bg-opacity-30 p-2 rounded-full shadow-lg"
        >
          <User className="h-6 w-6 text-purple-700" />
        </button>
      </div>
      {/* Sidebar drawer for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64">{Sidebar}</div>
        </div>
      )}
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="max-w-7xl mx-auto w-full px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 md:mb-0">Account Dashboard</h1>
            <div className="flex space-x-2 bg-gray-800 bg-opacity-60 rounded-2xl p-1">
              <button
                onClick={() => setActiveTab('normal')}
                className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ease-in-out ${activeTab === 'normal' ? 'bg-white text-purple-600 shadow-lg' : 'text-white hover:bg-white hover:bg-opacity-10'}`}
              >
                Normal Txn
              </button>
              <button
                onClick={() => setActiveTab('internal')}
                className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ease-in-out ${activeTab === 'internal' ? 'bg-white text-purple-600 shadow-lg' : 'text-white hover:bg-white hover:bg-opacity-10'}`}
              >
                Internal Txn
              </button>
              <button
                onClick={() => setActiveTab('token')}
                className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ease-in-out ${activeTab === 'token' ? 'bg-white text-purple-600 shadow-lg' : 'text-white hover:bg-white hover:bg-opacity-10'}`}
              >
                Token Transfers
              </button>
            </div>
          </div>
          <div className="mt-8">
            {activeTab === 'normal' && <NormalTransaction address={address} />}
            {activeTab === 'internal' && <InternalTransaction accountAddress={address} />}
            {activeTab === 'token' && <TokenTransfers address={address} />}
          </div>
        </div>
      </div>
    </div>
  );
} 