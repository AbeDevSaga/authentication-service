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

const ORGANIZATION_NAMES = [
  "Tech Solutions",
  "Health Care Innovations",
  "Green Energy Co.",
  "EduConnect",
  "Smart Logistics",
  "Creative Media Hub",
];

module.exports = { ORGANIZATION_NAMES, adminUser };
