import { loadLeaderboard } from '@/lib/leaderboard';

const { NextResponse } = require('next/server')

// API to get leaderboard
export async function GET(request) {
  const leaderboard = await loadLeaderboard(); 
  return NextResponse.json({leaderboard});
}