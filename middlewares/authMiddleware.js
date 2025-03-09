const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ error: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Unauthorized" });
    req.user = decoded;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "Admin")
    return res.status(403).json({ error: "Access denied" });
  next();
};

const isSuperAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "Super Admin") {
      return res
        .status(403)
        .json({ error: "Access denied, only Super Admins are allowed" });
    }
    req.organizationId = user.organization; // Pass organization ID for validation in controller
    next();
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const allowAdmins = async (req, res, next) => {
  console.log("allow admins");
  try {
    const user = await User.findById(req.user.id);
    if (!user || (user.role !== "Admin" && user.role !== "Super Admin")) {
      return res
        .status(403)
        .json({ error: "Access denied, only Admins are allowed" });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  isSuperAdmin,
  allowAdmins,
};
