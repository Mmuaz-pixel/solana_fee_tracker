'use client'

import { useState } from 'react'
import { Search, ArrowRight, Wallet, ChartBar, Clock, Database } from 'lucide-react'

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('')
  const [feeData, setFeeData] = useState(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!walletAddress) {
      setError('Please enter a wallet address')
      return
    }

    setIsLoading(true)
    setError("")
    setFeeData(null)

    try {
      const response = await fetch(`/api/fees?address=${walletAddress}`)

      if (!response.ok) {
        throw new Error('Failed to fetch fees')
      }

      const data = await response.json()
      setFeeData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Solana Gas Fee Analytics
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Track and analyze your Solana wallet transaction fees with precision.
            Our tool provides comprehensive insights into your blockchain expenses,
            helping you optimize your transaction strategies.
          </p>
        </div>

        {/* Key Features Preview */}
        <div className="grid md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          {[
            { icon: <Wallet className="w-8 h-8 text-blue-400" />, title: "Wallet Tracking", desc: "Monitor multiple wallet addresses" },
            { icon: <ChartBar className="w-8 h-8 text-green-400" />, title: "Fee Analytics", desc: "Detailed transaction cost breakdown" },
            { icon: <Clock className="w-8 h-8 text-yellow-400" />, title: "Real-time Data", desc: "Instant fee calculations" },
            { icon: <Database className="w-8 h-8 text-purple-400" />, title: "Historical Insights", desc: "Track fee trends over time" }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 
              hover:bg-gray-800/70 transition-all duration-300 ease-in-out 
              transform hover:-translate-y-1 hover:scale-105 text-center"
            >
              <div className="flex justify-center mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Main Tracker */}
        <div className="w-4/5 mx-auto bg-gray-800/50 rounded-2xl border border-gray-700 p-6 shadow-2xl">
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Enter wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full p-3 pl-10 bg-gray-700/50 border border-gray-600 
                rounded-lg text-gray-100 placeholder-gray-500 
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                transition-all duration-300"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg 
              transition-colors disabled:opacity-50 active:scale-95"
            >
              {isLoading ? (
                <span className="animate-spin">
                  <ArrowRight size={20} className="animate-pulse" />
                </span>
              ) : (
                <ArrowRight size={20} />
              )}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-300 p-3 rounded-lg mb-4 animate-pulse">
              {error}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-6">
              <ArrowRight size={40} className="text-blue-500 animate-bounce" />
            </div>
          )}

          {/* Fee Data Display (Similar to previous implementation) */}
          {feeData && !isLoading && (
            <div className="space-y-6">
              {/* Summary Fees */}
              <div className="bg-gray-700/30 rounded-lg overflow-hidden">
                <table className="w-full text-gray-200">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="p-3 text-left">Fee Type</th>
                      <th className="p-3 text-right">Amount (SOL)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700/30">
                      <td className="p-3">Base Fees</td>
                      <td className="p-3 text-right text-green-400">{feeData.totalBaseFees}</td>
                    </tr>
                    <tr className="border-b border-gray-700/30">
                      <td className="p-3">External Fees</td>
                      <td className="p-3 text-right text-yellow-400">{feeData.totalExternalFees}</td>
                    </tr>
                    <tr className="bg-blue-500/10">
                      <td className="p-3 font-bold">Total Fees</td>
                      <td className="p-3 text-right font-bold text-blue-400">{feeData.totalFees}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Transaction History */}
              <div className="bg-gray-700/30 rounded-lg overflow-hidden">
                <div className="bg-gray-700/50 p-3 border-b border-gray-600">
                  <h2 className="text-lg font-semibold text-gray-200">Transaction History</h2>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-gray-300 text-sm">
                    <thead className="sticky top-0 bg-gray-700/50">
                      <tr>
                        <th className="p-2 text-left">Signature</th>
                        <th className="p-2 text-right">Base Fee</th>
                        <th className="p-2 text-right">External Fee</th>
                        <th className="p-2 text-right">Total Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feeData.transactions.map((tx, index) => (
                        <tr
                          key={tx.signature}
                          className={`
                          ${index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-700/20'}
                          hover:bg-blue-500/10 transition-colors
                        `}
                        >
                          <td className="p-2 truncate max-w-xs">
                            <a
                              href={`https://solscan.io/tx/${tx.signature}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 underline"
                            >
                              {tx.signature.slice(0, 30)}...
                            </a>
                          </td>
                          <td className="p-2 text-right text-green-400">{tx.baseFee}</td>
                          <td className="p-2 text-right text-yellow-400">{tx.externalFees}</td>
                          <td className="p-2 text-right text-blue-400">{tx.totalFee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Section */}
        <div className="text-center mt-12 text-gray-500">
          <p className="mb-4">
            Powered by Next.js & Tailwind CSS |
            Blockchain Fee Tracking Made Simple
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </div>
  )
}