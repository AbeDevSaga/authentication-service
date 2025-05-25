const express = require('express');
const router = express.Router();
const User = require("../models/user");
const { createOrganization, getAllOrganizations, getOrganizationById, updateOrganization, deleteOrganization } = require('../controllers/orgController');
const { createUser } = require('../controllers/userController');
const { verifyToken, isAdmin, isSuperAdmin } = require('../middlewares/authMiddleware');

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const { role, id } = req.user;
    if (role === "Admin") {
      // Only check admin role, don't send response
      await isAdmin(req, res, () => {});
      return getAllOrganizations(req, res, next);
    } else if (role === "Super Admin") {
      await isSuperAdmin(req, res, () => {});
      req.params.id = id;
      const user = await User.findById(id);
      console.log("user: ", user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.params.id = user.organization;
      return getOrganizationById(req, res, next);
    } else if (role === "Project Manager") {
      req.params.id = id;
      const user = await User.findById(id);
      console.log("user: ", user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.params.id = user.organization;
      return getOrganizationById(req, res, next);
    } else if (role === "Team Member") {
      req.params.id = id;
      const user = await User.findById(id);
      console.log("user: ", user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.params.id = user.organization;
      return getOrganizationById(req, res, next);
    } else if (role === "Developer") {
      req.params.id = id;
      const user = await User.findById(id);
      console.log("user: ", user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.params.id = user.organization;
      return getOrganizationById(req, res, next);
    } else {
      return res.status(403).json({ message: "Unauthorized access" });
    }
  } catch (error) {
    next(error);
  }
});

// Admin Basic Routes
router.post('/create_org', verifyToken, isAdmin, createOrganization);
router.put("/update_org/:id", verifyToken, isAdmin, updateOrganization);
router.delete("/delete_org/:id", verifyToken, isAdmin, deleteOrganization);

// SuperAdmin Basic Routes
router.post('/create_user', verifyToken, isSuperAdmin, createUser);
router.get("/:id",verifyToken, getOrganizationById);



module.exports = router;
