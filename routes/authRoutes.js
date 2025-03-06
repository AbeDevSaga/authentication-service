const express = require('express');
const router = express.Router();
const { register, login, createUser, createOrg } = require('../controllers/authController');
const { verifyToken, isAdmin, isSuperAdmin } = require('../middlewares/authMiddleware');
const { registerValidationRules, validate, loginValidationRules } = require('../validators/authValidators');

// User Basic Routes
router.post('/register',registerValidationRules, validate, register);
router.post('/login', loginValidationRules, validate, login);

// Organization Basic Routes
router.post('/create_org', verifyToken, isAdmin, createOrg);
router.post('/create_user', verifyToken, isSuperAdmin, createUser);


module.exports = router;
