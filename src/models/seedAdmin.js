const User = require("./user"); 
const bcrypt = require("bcrypt");

const adminUser = {
  username: "admin",
  email: "admin@gmail.com",
  password: "admin123", 
  role: "Admin",
  isPremium: true,
  organization: null, 
  services: [],
  chatGroups: [],
  files: [],
  profileImage: "",
};

const seedAdmin = async () => {
  try {
    // Check if the admin user already exists
    const existingAdmin = await User.findOne({ email: adminUser.email });
    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin);
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    adminUser.password = await bcrypt.hash(adminUser.password, salt);

    // Create the admin user
    const newAdmin = new User(adminUser);
    await newAdmin.save();

    console.log("Admin user created successfully:", newAdmin);
  } catch (error) {
    console.error("Error seeding admin user:", error);
  } 
};

module.exports = seedAdmin;