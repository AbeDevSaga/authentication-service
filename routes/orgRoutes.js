const express = require('express');
const router = express.Router();
const { createUser, createOrganization, getAllOrganizations, getOrganizationById, updateOrganization, deleteOrganization } = require('../controllers/orgController');
const { verifyToken, isAdmin, isSuperAdmin } = require('../middlewares/authMiddleware');


// Admin Basic Routes
router.post('/create_org', verifyToken, isAdmin, createOrganization);
router.put("/update_org/:id", verifyToken, isAdmin, updateOrganization);
router.delete("/delete_org/:id", verifyToken, isAdmin, deleteOrganization);

// SuperAdmin Basic Routes
router.post('/create_user', verifyToken, isSuperAdmin, createUser);

router.get("/",verifyToken, isAdmin, getAllOrganizations);
router.get("/:id",verifyToken, getOrganizationById);



module.exports = router;
