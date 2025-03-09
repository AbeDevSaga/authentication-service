const Organization = require("../models/organization");
const User = require("../models/user");

const populateOrganizationUsers = async () => {
  try {
    // Fetch all users from the database
    const users = await User.find({}).select("_id organization");

    // Group users by their organization ID
    const usersByOrganization = users.reduce((acc, user) => {
      if (user.organization) {
        if (!acc[user.organization]) {
          acc[user.organization] = [];
        }
        acc[user.organization].push(user._id);
      }
      return acc;
    }, {});

    // Update each organization with its associated users
    for (const [orgId, userIds] of Object.entries(usersByOrganization)) {
      await Organization.findByIdAndUpdate(orgId, { users: userIds });
    }

    console.log("Organization users populated successfully!");
  } catch (error) {
    console.error("Error populating organization users:", error);
  }
};

module.exports = populateOrganizationUsers;