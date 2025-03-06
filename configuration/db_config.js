const mongoose = require("mongoose");
const dotenv = require('dotenv');
const seedAdmin = require('../seeds/seedAdmin');

dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB')
    seedAdmin();
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;
