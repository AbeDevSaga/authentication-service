const Organization = require("../models/organization");
const { ORGANIZATION_NAMES } = require("./constants");

const seedOrg = async () => {
  try {
    for (const name of ORGANIZATION_NAMES) {
      const existingOrg = await Organization.findOne({ name });

      if (!existingOrg) {
        await Organization.create({ name });
        // console.log(`✅ Organization "${name}" seeded.`);
      } else {
        // console.log(`⚠️ Organization "${name}" already exists.`);
      }
    }
    console.log("✅ Organization seeding complete!");
  } catch (error) {
    console.error("❌ Error seeding organizations:", error);
  }
};

module.exports = seedOrg;
