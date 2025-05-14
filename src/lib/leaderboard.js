// leaderboard.js
const { connectToDB } = require('./mongodb');

// Validate wallet address
export function validateWalletAddress(address) {
  if (!address || address.length < 32 || address.length > 44) {
    throw new Error('Invalid wallet address');
  }
  return address;
}

// Load leaderboard from MongoDB
export async function loadLeaderboard() {
  try {
    const db = await connectToDB();
    const collection = db.collection('leaderboard');

    const leaderboard = await collection
      .find({})
      .sort({ totalFees: -1 })
      .limit(50)
      .toArray();

    return leaderboard;
  } catch (error) {
    console.error('Error loading leaderboard:', error);
    return [];
  }
}

// Update leaderboard in MongoDB
export async function updateLeaderboard(wallet, totalFees) {
  try {
    const db = await connectToDB();
    const collection = db.collection('leaderboard');

    // Upsert (update if exists, insert if not)
    await collection.updateOne(
      { wallet },
      { $set: { wallet, totalFees } },
      { upsert: true }
    );

    // Reload and sort to get new position
    const leaderboard = await loadLeaderboard();
    const newPosition = leaderboard.findIndex(entry => entry.wallet === wallet) + 1;
    return newPosition;
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    throw error;
  }
}
