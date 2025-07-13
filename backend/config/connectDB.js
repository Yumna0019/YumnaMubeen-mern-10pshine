const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ Connection Error:', err);
  }
};

module.exports = connectDB;
