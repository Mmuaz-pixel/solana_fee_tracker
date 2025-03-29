const fs = require('fs');
const path = require('path');

const leaderboardFilePath = path.join(process.cwd(), 'leaderboard.json');

// Load leaderboard from file
export function loadLeaderboard() {
  try {
    if (fs.existsSync(leaderboardFilePath)) {
      return JSON.parse(fs.readFileSync(leaderboardFilePath, 'utf8'));
    }
  } catch (error) {
    console.error('Error loading leaderboard:', error);
  }
  return [];
}

// Save leaderboard to file
export function saveLeaderboard(leaderboard) {
  try {
    fs.writeFileSync(leaderboardFilePath, JSON.stringify(leaderboard, null, 2));
  } catch (error) {
    console.error('Error saving leaderboard:', error);
  }
}

let leaderboard = loadLeaderboard();

// Validate wallet address
export function validateWalletAddress(address) {
  if (!address || address.length < 32 || address.length > 44) {
    throw new Error('Invalid wallet address');
  }
  return address;
}

// Update the leaderboard
export function updateLeaderboard(wallet, totalFees) {
  const existingEntry = leaderboard.find(entry => entry.wallet === wallet);
  
  if (existingEntry) {
    existingEntry.totalFees = totalFees;
  } else {
    leaderboard.push({ wallet, totalFees });
  }

  // Sort by total fees in descending order and keep top 10
  leaderboard.sort((a, b) => b.totalFees - a.totalFees);
  leaderboard = leaderboard.slice(0, 10);

  saveLeaderboard(leaderboard);
}