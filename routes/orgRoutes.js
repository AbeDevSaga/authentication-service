const express = require('express');
const router = express.Router();
const { createUser, createOrg, getAllOrganizations, getOrganizationById } = require('../controllers/orgController');
const { verifyToken, isAdmin, isSuperAdmin } = require('../middlewares/authMiddleware');


// Organization Basic Routes
router.post('/create_org', verifyToken, isAdmin, createOrg);
router.post('/create_user', verifyToken, isSuperAdmin, createUser);
router.get("/", getAllOrganizations);
router.get("/:id", getOrganizationById);



module.exports = router;
