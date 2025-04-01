'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, ArrowRight, Wallet, ChartBar, Clock, Database, Trophy, Share2, Download } from 'lucide-react'

const topLeaderBoards = [
  {
    name: "Euris",
    address: "DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj",
    totalFees: 5796.192933325792
  },
  {
    name: "West",
    address: "JDd3hy3gQn2V982mi1zqhNqUw1GfV2UL6g76STojCJPN",
    totalFees: 3115.2462797280023
  },
  {
    name: "Pow",
    address: "8zFZHuSRuDpuAR7J6FzwyF3vKNx4CVW3DFHJerQhc7Zd",
    totalFees: 4162.88473040402
  },
  {
    name: "Casino",
    address: "8rvAsDKeAcEjEkiZMug9k8v1y8mW6gQQiMobd89Uy7qR",
    totalFees: 3385.139385574078
  },
  {
    name: "Kreo",
    address: "BCnqsPEtA1TkgednYEebRpkmwFRJDCjMQcKZMMtEdArc",
    totalFees: 1453.2635644760444
  }
];


export default function Home() {
  const [walletAddress, setWalletAddress] = useState('')
  const [feeData, setFeeData] = useState(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [leaderboard, setLeaderboard] = useState([])
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(true)
  const [showShareCard, setShowShareCard] = useState(false)
  const [isGameVisible, setIsGameVisible] = useState(false);

  useEffect(() => {
    // Fetch leaderboard data when component mounts
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      setIsLeaderboardLoading(true)
      const response = await fetch('/api/leaderboard')

      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard data')
      }

      const data = await response.json()
      setLeaderboard(data.leaderboard)
    } catch (err) {
      console.error('Error fetching leaderboard:', err)
    } finally {
      setIsLeaderboardLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!walletAddress) {
      setError('Please enter a wallet address')
      return
    }

    const exists = topLeaderBoards.some((entry) => entry.address === walletAddress);

    if(exists)
    {
      setError("Check the KOL Leadorboard")
      return
    }

    setIsLoading(true)
    setIsGameVisible(true);
    setError("")
    setFeeData(null)
    setShowShareCard(false)

    try {
      const response = await fetch(`/api/fees?address=${walletAddress}`)

      if (!response.ok) {
        throw new Error('Failed to fetch fees')
      }

      const data = await response.json()
      setFeeData(data)

      // Refresh leaderboard after a new search
      fetchLeaderboard()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  // Function to shorten wallet address
  const shortenAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Function to handle showing the share card
  const handleShowShareCard = () => {
    setShowShareCard(true)
  }

  // Function to get formatted date
  const getFormattedDate = () => {
    const now = new Date()
    return now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      <div className="container mx-auto px-4 py-12">

        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-3">
            <img src="/logo.png" alt="Logo" className="w-16 h-16" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Solana Gas Fee Analytics
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Track and analyze your Solana wallet transaction fees with precision.
            Our tool provides comprehensive insights into your blockchain expenses,
            helping you optimize your transaction strategies.
          </p>

          <p className='text-gray-200 py-2 max-w-2xl mx-auto'>CA: soon</p>

          <a href='#leaderboard' className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-600 transition duration-300 cursor-pointer">
            View Leaderboard
          </a>
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
        <div className="w-3/4 mx-auto bg-gray-800/50 rounded-2xl border border-gray-700 p-6 shadow-2xl">
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
          <div className="flex flex-col justify-center items-center py-6">
            {/* Modal */}
            {isGameVisible && (
              <div className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ease-in-out backdrop-blur-sm bg-white/30 dark:bg-gray-900/50">
                <div className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-lg shadow-lg flex flex-col items-center relative transition-all duration-300 ease-in-out border border-gray-200 dark:border-gray-700">
                  {/* Loading Indicator */}
                  {isLoading && (
                    <div className="flex items-center space-x-2 py-4">
                      <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                      <div className="animate-pulse text-gray-800 dark:text-gray-200 font-medium">Loading Transactions...</div>
                    </div>
                  )}
                  {/* Iframe for the game */}
                  <iframe
                    src="https://flappybird.io/"
                    style={{ width: "350px", height: "500px", overflow: "hidden" }}
                    className="rounded-md border border-gray-200 dark:border-gray-700 shadow-md"
                    scrolling="no"
                  ></iframe>

                  {/* End Game Button */}
                  {!isLoading && (
                    <button
                      onClick={() => setIsGameVisible(false)}
                      className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg transition-colors duration-200 hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Check Results
                    </button>

                  )}
                </div>
              </div>
            )}
          </div>

          {/* Fee Data Display */}
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
                      <td className="p-3">Standard Fees</td>
                      <td className="p-3 text-right text-green-400">{feeData.totalBaseFees.toLocaleString()}</td>
                    </tr>
                    <tr className="border-b border-gray-700/30">
                      <td className="p-3">Platform Fees</td>
                      <td className="p-3 text-right text-yellow-400">{feeData.totalExternalFees.toLocaleString()}</td>
                    </tr>
                    <tr className="bg-blue-500/10">
                      <td className="p-3 font-bold">Total Fees</td>
                      <td className="p-3 text-right font-bold text-blue-400">{feeData.totalFees.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Share Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleShowShareCard}
                  className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg 
                  transition-colors active:scale-95"
                >
                  <Share2 size={18} />
                  <span>Share Fee Stats</span>
                </button>
              </div>

              {/* Shareable Card */}
              {showShareCard && (
                <ImageModal
                  feeData={feeData}
                  onClose={() => setShowShareCard(false)}
                />
              )}

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
                        <th className="p-2 text-right">Standard Fee</th>
                        <th className="p-2 text-right">Platform Fee</th>
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
                          <td className="p-2 text-right text-green-400">{tx.baseFee.toLocaleString()}</td>
                          <td className="p-2 text-right text-yellow-400">{tx.externalFees.toLocaleString()}</td>
                          <td className="p-2 text-right text-blue-400">{tx.totalFee.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='flex'>
          {/* Leaderboard Section */}
          <div
            id="leaderboard"
            className="md:w-2/5 mx-3 bg-gray-800/50 rounded-2xl border border-gray-700 p-6 shadow-2xl mt-12 h-96 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Trophy className="text-yellow-400 w-6 h-6" />
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500">
                  KOL Leaderboard
                </h2>
              </div>
            </div>

            <div className="bg-gray-700/30 rounded-lg overflow-hidden">
              <table className="w-full text-gray-300">
                {/* Sticky Header */}
                <thead className="bg-gray-700/50 sticky top-0">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Wallet</th>
                    <th className="p-3 text-right">Total Fees (SOL)</th>
                  </tr>
                </thead>
                <tbody>
                  {topLeaderBoards.map((entry, index) => (
                    <tr
                      key={entry.address}
                      className="border-b border-gray-700/30 hover:bg-blue-500/10 transition-colors"
                    >
                      <td className="p-3 font-semibold">
                        <span>{entry.name}</span>
                      </td>
                      <td className="p-3">
                        <a
                          href={`https://solscan.io/account/${entry.wallet}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline"
                        >
                          {shortenAddress(entry.address)}
                        </a>
                      </td>
                      <td className="p-3 text-right font-medium text-blue-400">
                        {entry.totalFees.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Leaderboard Section */}
          <div id='leaderboard' className="md:w-3/5 mx-auto bg-gray-800/50 rounded-2xl border border-gray-700 p-6 shadow-2xl mt-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Trophy className="text-yellow-400 w-6 h-6" />
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500">
                  Fee Leaderboard
                </h2>
              </div>
              <button
                onClick={fetchLeaderboard}
                className="text-gray-400 hover:text-gray-200 transition-colors text-sm"
                disabled={isLeaderboardLoading}
              >
                Refresh
              </button>
            </div>

            {isLeaderboardLoading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-pulse text-gray-400">Loading leaderboard...</div>
              </div>
            ) : (
              <div className="bg-gray-700/30 rounded-lg overflow-hidden">
                <table className="w-full text-gray-300">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="p-3 text-left">Rank</th>
                      <th className="p-3 text-left">Wallet</th>
                      <th className="p-3 text-right">Total Fees (SOL)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.length > 0 ? (
                      leaderboard.map((entry, index) => (
                        <tr
                          key={entry.wallet}
                          className={`
                            border-b border-gray-700/30 
                            ${index === 0 ? 'bg-yellow-500/10' : ''}
                            ${index === 1 ? 'bg-gray-400/10' : ''}
                            ${index === 2 ? 'bg-amber-700/10' : ''}
                            hover:bg-blue-500/10 transition-colors
                          `}
                        >
                          <td className="p-3 font-semibold">
                            {index === 0 && <span className="text-yellow-400">🥇</span>}
                            {index === 1 && <span className="text-gray-300">🥈</span>}
                            {index === 2 && <span className="text-amber-700">🥉</span>}
                            {index > 2 && <span>{index + 1}</span>}
                          </td>
                          <td className="p-3">
                            <a
                              href={`https://solscan.io/account/${entry.wallet}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 underline"
                            >
                              {shortenAddress(entry.wallet)}
                            </a>
                          </td>
                          <td className="p-3 text-right font-medium text-blue-400">
                            {entry.totalFees.toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="p-6 text-center text-gray-500">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4 text-xs text-gray-500 text-center">
              Leaderboard shows wallets with highest total transaction fees
            </div>
          </div>

        </div>

        {/* Footer Section */}
        <div className="text-center mt-12 text-gray-500">
          <p className="mb-4">
            FeeScope |
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

const ImageModal = ({ feeData, onClose }) => {
  const copyImageToClipboard = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = async () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // Match the styling from the displayed image
      ctx.font = "bold 28px 'Poppins', sans-serif";
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      
      // Position text at 10% from the top instead of center
      const textY = canvas.height * 0.1;
      ctx.fillText(`-${feeData.totalFees.toFixed(9)} SOL`, canvas.width / 2, textY);
      
      canvas.toBlob(async (blob) => {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          alert('Image copied to clipboard! ✅');
        } catch (err) {
          console.error('Failed to copy image: ', err);
        }
      }, 'image/png');
    };
    img.src = '/pnl.png';
  };
  
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 bg-opacity-60 rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-end items-center mb-4">
          <button
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="relative">
          <img src="/pnl.png" alt="PNL Chart" className="w-full" />
          <div
            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: '10%' }}
          >
            <h2
              className="text-white font-extrabold text-4xl bg-opacity-50 p-4 rounded"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              -{feeData.totalFees.toFixed(9)} SOL
            </h2>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 
              text-white py-3 px-6 rounded-lg font-semibold shadow-lg transition-all
              duration-300 transform hover:scale-105 cursor-pointer"
            onClick={copyImageToClipboard}
          >
            📋 Copy Image
          </button>
        </div>
      </div>
    </div>
  );
};