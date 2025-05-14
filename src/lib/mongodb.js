// mongodb.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://muaz:muazgill@cluster0.gr55lmi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
const client = new MongoClient(uri);

let db;

async function connectToDB() {
  if (!db) {
    await client.connect();
    db = client.db('leaderboardDB'); // or your database name
  }
  return db;
}

module.exports = { connectToDB };
