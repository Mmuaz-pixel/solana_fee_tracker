'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, ArrowRight, Wallet, ChartBar, Clock, Database, Trophy, Share2, Download } from 'lucide-react'

import domtoimage from 'dom-to-image';

const topLeaderBoards = [
  {
    name: "Cupsey",
    address: "suqh5sHtr8HyJ7q8scBimULPkPpA557prMG47xCHQfK",
    totalFees: 19442.540720612007
  },
  {
    name: "Jidn",
    address: "3h65MmPZksoKKyEpEjnWU2Yk2iYT5oZDNitGy5cTaxoE",
    totalFees: 7412.0151709756765
  },
  {
    name: "Cooker",
    address: "8deJ9xeUvXSJwicYptA9mHsU2rN2pDx37KWzkDkEXhU6",
    totalFees: 7040.021866483238
  },
  {
    name: "Euris",
    address: "DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj",
    totalFees: 5796.192933325792
  },
  {
    name: "MrFrog",
    address: "4DdrfiDHpmx55i4SPssxVzS9ZaKLb8qr45NKY9Er9nNh",
    totalFees: 5067.330240729964
  },
  {
    name: "Pow",
    address: "8zFZHuSRuDpuAR7J6FzwyF3vKNx4CVW3DFHJerQhc7Zd",
    totalFees: 4162.884730404021
  },
  {
    name: "Publix",
    address: "86AEJExyjeNNgcp7GrAvCXTDicf5aGWgoERbXFiG1EdD",
    totalFees: 4007.2531761437785
  },
  {
    name: "Nach",
    address: "9jyqFiLnruggwNn4EQwBNFXwpbLM9hrA4hV59ytyAVVz",
    totalFees: 3796.460305132303
  },
  {
    name: "Assasin",
    address: "6LChaYRYtEYjLEHhzo4HdEmgNwu2aia8CM8VhR9wn6n7",
    totalFees: 3605.402711569819
  },
  {
    name: "Casino",
    address: "8rvAsDKeAcEjEkiZMug9k8v1y8mW6gQQiMobd89Uy7qR",
    totalFees: 3385.139385574078
  },
  {
    name: "OgAntD",
    address: "215nhcAHjQQGgwpQSJQ7zR26etbjjtVdW74NLzwEgQjP",
    totalFees: 3319.955297533334
  },
  {
    name: "West",
    address: "JDd3hy3gQn2V982mi1zqhNqUw1GfV2UL6g76STojCJPN",
    totalFees: 3115.2462797280023
  },
  {
    name: "Ferb",
    address: "m7Kaas3Kd8FHLnCioSjCoSuVDReZ6FDNBVM6HTNYuF7",
    totalFees: 2630.5986277209927
  },
  {
    name: "Loopierr",
    address: "9yYya3F5EJoLnBNKW6z4bZvyQytMXzDcpU5D6yYr4jqL",
    totalFees: 2477.0859534168376
  },
  {
    name: "Tim",
    address: "AJ6MGExeK7FXmeKkKPmALjcdXVStXYokYNv9uVfDRtvo",
    totalFees: 2296.4181768308804
  },
  {
    name: "404Flipped",
    address: "AbcX4XBm7DJ3i9p29i6sU8WLmiW4FWY5tiwB9D6UBbcE",
    totalFees: 2088.432251463977
  },
  {
    name: "Orange",
    address: "96sErVjEN7LNJ6Uvj63bdRWZxNuBngj56fnT9biHLKBf",
    totalFees: 2059.6822260370004
  },
  {
    name: "Bastille",
    address: "3kebnKw7cPdSkLRfiMEALyZJGZ4wdiSRvmoN4rD1yPzV",
    totalFees: 1916.9409923028375
  },
  {
    name: "Gake",
    address: "DNfuF1L62WWyW3pNakVkyGGFzVVhj4Yr52jSmdTyeBHm",
    totalFees: 1903.3469697003184
  },
  {
    name: "S",
    address: "ApRnQN2HkbCn7W2WWiT2FEKvuKJp9LugRyAE1a9Hdz1",
    totalFees: 1719.221209759915
  },
  {
    name: "Kreo",
    address: "BCnqsPEtA1TkgednYEebRpkmwFRJDCjMQcKZMMtEdArc",
    totalFees: 1453.2635644760444
  },
  {
    name: "Gorilla Capital",
    address: "DpNVrtA3ERfKzX4F8Pi2CVykdJJjoNxyY5QgoytAwD26",
    totalFees: 1293.2584211300132
  },
  {
    name: "Daumen",
    address: "8MaVa9kdt3NW4Q5HyNAm1X5LbR8PQRVDc1W8NMVK88D5",
    totalFees: 1253.5031278890337
  },
  {
    name: "Tahi",
    address: "5x8tfrJSn4Pt5gjQEMWDnoLvAzZ8rgJVTXiTpcwhbxmN",
    totalFees: 1264.0566900790084
  },
  {
    name: "Al4n",
    address: "2YJbcB9G8wePrpVBcT31o8JEed6L3abgyCjt5qkJMymV",
    totalFees: 1105.8697194080128
  },
  {
    name: "Red",
    address: "7ABz8qEFZTHPkovMDsmQkm64DZWN5wRtU7LEtD2ShkQ6",
    totalFees: 891.5134470649458
  },
  {
    name: "MoneyMaykah",
    address: "2CXbN6nuTTb4vCrtYM89SfQHMMKGPAW4mvFe6Ht4Yo6z",
    totalFees: 855.2372555089712
  },
  {
    name: "Kadenox",
    address: "3pZ59YENxDAcjaKa3sahZJBcgER4rGYi4v6BpPurmsGj",
    totalFees: 699.6631053139957
  },
  {
    name: "Dex",
    address: "mW4PZB45isHmnjGkLpJvjKBzVS5NXzTJ8UDyug4gTsM",
    totalFees: 597.8728476660036
  },
  {
    name: "Qtdegen",
    address: "7tiRXPM4wwBMRMYzmywRAE6jveS3gDbNyxgRrEoU6RLA",
    totalFees: 570.541990394993
  },
  {
    name: "Insyder",
    address: "G3g1CKqKWSVEVURZDNMazDBv7YAhMNTjhJBVRTiKZygk",
    totalFees: 542.0420696220025
  },
  {
    name: "Leens",
    address: "7iabBMwmSvS4CFPcjW2XYZY53bUCHzXjCFEFhxeYP4CY",
    totalFees: 521.1685040819845
  },
  {
    name: "ShockedJS",
    address: "6m5sW6EAPAHncxnzapi1ZVJNRb9RZHQ3Bj7FD84X9rAF",
    totalFees: 507.13125244599973
  },
  {
    name: "Issa",
    address: "2BU3NAzgRA2gg2MpzwwXpA8X4CCRaLgrf6TY1FKfJPX2",
    totalFees: 489.22767962599755
  },
  {
    name: "yenni",
    address: "5B52w1ZW9tuwUduueP5J7HXz5AcGfruGoX6YoAudvyxG",
    totalFees: 383.0619606869767
  },
  {
    name: "Henn100x",
    address: "FRbUNvGxYNC1eFngpn7AD3f14aKKTJVC6zSMtvj2dyCS",
    totalFees: 220.68108175199825
  },
  {
    name: "DV",
    address: "BCagckXeMChUKrHEd6fKFA1uiWDtcmCXMsqaheLiUPJd",
    totalFees: 974.3282531759791
  },
  {
    name: "Nyhrox",
    address: "7uTZLDL3mY6kDnwxuqqu3WGgtMiPsYMmCvX3NQt4W8VS",
    totalFees: 114.78041691400081
  },
  {
    name: "Dior",
    address: "D2wBctC1K2mEtA17i8ZfdEubkiksiAH2j8F7ri3ec71V",
    totalFees: 113.94734242100034
  },
  {
    name: "Robo",
    address: "Gv7CnRo2L2SJ583XEfoKHKbmWK3wNoBDxVoJqMKJR4Nu",
    totalFees: 108.55491885500024
  },
  {
    name: "Jaden",
    address: "CqQKv6XdrMWrz3YuSwqTTcVoQK5eu4zNo3hps3M1Q3yo",
    totalFees: 46.126673182000026
  },
  {
    name: "Lynk",
    address: "2UfCfxdWrwnPDVvT245EwmcyUabQE2wuWYcBozj44ZA1",
    totalFees: 4.108438959000002
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

    if (exists) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      <div className="container mx-auto px-4 py-12">

        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <div className="flex absolute top-0 left-1 items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="w-20 h-20" />
            <h2 className="text-4xl font-semibold">FeeScope</h2>
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
                    <div className='flex flex-col'>
                      <div className="flex items-center space-x-2 py-4">
                        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        <div className="animate-pulse text-gray-800 dark:text-gray-200 font-medium">Loading Transactions...</div>
                      </div>
                      <div className="text-gray-300 font-medium w-80 mx-auto">
                        We’re currently processing all transactions to provide you with the most accurate results. Please be patient while we gather the information
                      </div>
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
                      <td className="p-3 text-right text-green-400">{feeData.totalBaseFees}</td>
                    </tr>
                    <tr className="border-b border-gray-700/30">
                      <td className="p-3">Platform Fees</td>
                      <td className="p-3 text-right text-yellow-400">{feeData.totalExternalFees}</td>
                    </tr>
                    <tr className="bg-blue-500/10">
                      <td className="p-3 font-bold">Total Fees</td>
                      <td className="p-3 text-right font-bold text-blue-400">{feeData.totalFees}</td>
                    </tr>
                    <tr className="bg-blue-500/10">
                      <td className="p-3 font-bold">Leaderboard Position</td>
                      <td className="p-3 text-right font-bold text-blue-400">{feeData.position}</td>
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
                  wallet={walletAddress}
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

        <div className='flex'>
          {/* Leaderboard Section */}
          <div
            id="leaderboard"
            className="md:w-2/5 mx-3 bg-gray-800/50 rounded-2xl border border-gray-700 p-6 shadow-2xl mt-12 "
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Trophy className="text-yellow-400 w-6 h-6" />
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500">
                  KOL Leaderboard
                </h2>
              </div>
            </div>

            <div className="bg-gray-700/30 rounded-lg overflow-hidden h-72 overflow-y-auto">
              <table className="w-full text-gray-300">
                {/* Sticky Header */}
                <thead className="bg-gray-700 sticky top-0">
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
                          href={`https://solscan.io/account/${entry.address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline"
                        >
                          {shortenAddress(entry.address)}
                        </a>
                      </td>
                      <td className="p-3 text-right font-medium text-blue-400">
                        {entry.totalFees}
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
              <div className="bg-gray-700/30 rounded-lg overflow-hidden h-72 overflow-y-auto">
                <table className="w-full text-gray-300">
                  <thead className="bg-gray-700 sticky">
                    <tr>
                      <th className="p-3 text-left">Rank</th>
                      <th className="p-3 text-left">Wallet</th>
                      <th className="p-3 text-right">Total Fees (SOL)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.length > 0 ? (
                      leaderboard.slice(0, 50).map((entry, index) => (
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
                            {entry.totalFees}
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

const ImageModal = ({ feeData, onClose, wallet }) => {
  // Create a ref for the container that holds the complete image with overlays
  const imageContainerRef = useRef(null);

  const copyImageToClipboard = async () => {
    if (!imageContainerRef.current) return;

    try {
      const dataUrl = await domtoimage.toPng(imageContainerRef.current, {
        quality: 0.95,
        bgcolor: 'transparent',
        scale: 2
      });

      // Create an image and convert to blob for clipboard
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

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
      img.src = dataUrl;
    } catch (err) {
      console.error('Failed to capture image: ', err);
    }
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
        {/* Apply the ref to this container */}
        <div className="relative" ref={imageContainerRef}>
          <img src="/raw.png" alt="PNL Chart" className="w-full" />
          <div
            className="absolute"
            style={{ top: '22%', left: '60%' }}
          >
            <h2
              className="text-white font-extrabold bg-opacity-50 p-4 rounded"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: '22px' }}
            >
              <div>{feeData.totalFees.toFixed(2)}</div>
              <div>SOL</div>
            </h2>
          </div>
          <div className='absolute' style={{ top: '84%', left: '21%', fontWeight: 'bold' }}>
            {wallet.slice(0, 4)}...{wallet.slice(-4)}
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