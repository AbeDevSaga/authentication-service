const express = require('express');
const router = express.Router();
const { register, login, createUser } = require('../controllers/authController');
const { verifyToken, isSuperAdmin } = require('../middlewares/authMiddleware');
const { registerValidationRules, validate, loginValidationRules } = require('../validators/authValidators');

router.post('/register',registerValidationRules, validate, register);
router.post('/create_user', verifyToken, isSuperAdmin, createUser);
router.post('/login', loginValidationRules, validate, login);

module.exports = router;
