const { NextResponse } = require('next/server')
const { fetchTransactions, processTransaction, API_KEY } = require('@/lib/helius')
import { updateLeaderboard } from '@/lib/leaderboard'

// Validate wallet address (basic validation)
function validateWalletAddress(address) {
  if (!address || address.length < 32 || address.length > 44) {
    throw new Error('Invalid wallet address')
  }
  return address
}

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const address = searchParams.get('address')

  try {
    // Validate wallet address
    const validAddress = validateWalletAddress(address)

    // Fetch transactions
    const transactions = await fetchTransactions(validAddress, API_KEY)

    // Process transactions
    const processedTransactions = transactions.map(tx =>
      processTransaction(validAddress, tx)
    )

    // Calculate total fees
    const totalBaseFees = processedTransactions.reduce((sum, tx) => sum + tx.baseFee, 0)
    const totalExternalFees = processedTransactions.reduce((sum, tx) => sum + tx.externalFees, 0)

    const position = updateLeaderboard(address, totalBaseFees + totalExternalFees);

    return NextResponse.json({
      wallet: validAddress,
      transactionCount: processedTransactions.length,
      totalBaseFees,
      totalExternalFees,
      totalFees: totalBaseFees + totalExternalFees,
      transactions: processedTransactions,
      position: position
    })
  } catch (error) {
    console.error('Fee lookup error:', error)
    return NextResponse.json({
      error: error.message || 'Invalid wallet address'
    }, { status: 400 })
  }
}