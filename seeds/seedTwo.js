const User = require("../models/user");
const { generateFakeUser } = require("./constants");
const org_id = [
    "67cd5c7bd1757dabb72ade82",
    "67cd5c7bd1757dabb72ade84",
    "67cd5c7bd1757dabb72ade80",
    "67cd5c7bd1757dabb72ade83",
    "67cd5c7bd1757dabb72ade85",
    "67cd5c7bd1757dabb72ade86",
    "67cd5c7bd1757dabb72ade87",
    "67cd5c7bd1757dabb72ade7f",
    "67cd5c7bd1757dabb72ade88",
    "67cd5c7bd1757dabb72ade81",
  ]

const seedUsers = async () => {
  try {
    for (const orgId of org_id) {
      const users = [];
      for (let i = 0; i < 10; i++) {
        const user = await generateFakeUser();
        user.organization = orgId; 
        users.push(user);
      }
      await User.insertMany(users);
      console.log(`Seeded 10 users for organization ${orgId} successfully!`);
    }

    console.log("Seeding completed for all organizations!");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

module.exports = seedUsers;