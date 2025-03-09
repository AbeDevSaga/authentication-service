const mongoose = require("mongoose");
const dotenv = require('dotenv');
const seedAdmin = require('../seeds/seedAdmin');
const seedOrg = require('../seeds/seedOrganization');
const populateOrganizationUsers = require("../seeds/populateOrganizationUsers");

dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB')
    // await seedUsers();
    // await seedOrg();
    // await seedAdmin();
    // await populateOrganizationUsers();
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;
