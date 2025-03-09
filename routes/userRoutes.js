const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById, getUsersByOrganizationId, deleteUser, updateUser, getPremiumUsers } = require('../controllers/userController');
const { verifyToken, isSuperAdmin, allowAdmins } = require('../middlewares/authMiddleware');


// SuperAdmin only Basic Routes
router.post('/create_user', verifyToken, isSuperAdmin, createUser);


// Admin and Super Admin Basic Routes
router.get("/",verifyToken, allowAdmins, getAllUsers);
router.put("/update_user/:id", verifyToken, allowAdmins, updateUser);
router.delete("/delete/:id", verifyToken, allowAdmins, deleteUser);
router.get("/org/:id",verifyToken, allowAdmins, getUsersByOrganizationId);
router.get("/premium",verifyToken, allowAdmins, getPremiumUsers);
router.get("/:id",verifyToken, allowAdmins, getUserById);

module.exports = router;
