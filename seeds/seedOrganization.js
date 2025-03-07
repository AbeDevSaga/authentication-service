const Organization = require("../models/organization");
const { organizations } = require("./constants");

const seedOrg = async () => {
  try {
    await Organization.deleteMany();
    await Organization.insertMany(organizations);
    console.log("All Organization added successfully!");
  } catch (error) {
    console.error("Error seeding Organization:", error);
  }
};

module.exports = seedOrg;
