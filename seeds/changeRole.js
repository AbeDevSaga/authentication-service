const User = require("../models/user"); // Update the path if needed

const changeRole = async () => {
  try {
    // Find all users with a non-null organization
    const usersWithOrg = await User.find({ organization: { $ne: null } });

    console.log(`Found ${usersWithOrg.length} users with organization.`);

    // Update each user's role to "Developer"
    const updatePromises = usersWithOrg.map((user) =>
      User.updateOne({ _id: user._id }, { role: "Developer" })
    );

    await Promise.all(updatePromises);

    console.log("Roles updated to Developer for all applicable users.");
  } catch (err) {
    console.error("Error updating roles:", err);
  }
};

module.exports = changeRole;