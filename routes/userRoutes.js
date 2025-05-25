const express = require("express");
const User = require("../models/user");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  getUsersByOrganizationId,
  deleteUser,
  updateUser,
  getPremiumUsers,
} = require("../controllers/userController");
const {
  verifyToken,
  isSuperAdmin,
  allowAdmins,
  isAdmin,
} = require("../middlewares/authMiddleware");

// SuperAdmin only Basic Routes
router.post("/create_user", verifyToken, allowAdmins, createUser);

// Admin and Super Admin Basic Routes
//  router.get("/", verifyToken, allowAdmins, getAllUsers);

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const { role, id } = req.user;
    if (role === "Admin") {
      // Only check admin role, don't send response
      await isAdmin(req, res, () => {});
      return getAllUsers(req, res, next);
    } else if (role === "Super Admin") {
      await isSuperAdmin(req, res, () => {});
      req.params.id = id;
      const user = await User.findById(id);
      console.log("user: ", user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.params.id = user.organization;
      return getUsersByOrganizationId(req, res, next);
    } else if (role === "Project Manager") {
      req.params.id = id;
      const user = await User.findById(id);
      console.log("user: ", user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.params.id = user.organization;
      return getUsersByOrganizationId(req, res, next);
    } else if (role === "Team Member") {
      req.params.id = id;
      const user = await User.findById(id);
      console.log("user: ", user);
      if (!user) {
        return res.status(404).json({ message: "User not found" }); 
      }
      req.params.id = user.organization;
      return getUsersByOrganizationId(req, res, next);
    } else if (role === "Developer") {
      req.params.id = id;
      const user = await User.findById(id);
      console.log("user: ", user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.params.id = user.organization;
      return getUsersByOrganizationId(req, res, next);
    } else {
      return res.status(403).json({ message: "Unauthorized access" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/update_user/:id", verifyToken, allowAdmins, updateUser);
router.delete("/delete/:id", verifyToken, allowAdmins, deleteUser);
router.get("/org/:id", verifyToken, getUsersByOrganizationId);
router.get("/premium", verifyToken, allowAdmins, getPremiumUsers);
router.get("/:id", verifyToken, getUserById);

module.exports = router;
