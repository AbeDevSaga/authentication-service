const User = require("../models/user");
const { generateFakeUser }  = require("./constants");
const seedUsers = async (numUsers = 10) => {
  try {
    // await User.deleteMany({}); 

    const users = [];
    for (let i = 0; i < numUsers; i++) {
      const user = await generateFakeUser();
      users.push(user);
    }

    await User.insertMany(users);
    console.log(`Seeded ${numUsers} users successfully!`);
  } catch (error) {
    console.error("Error seeding users:", error);
  } 
};

module.exports = seedUsers;
