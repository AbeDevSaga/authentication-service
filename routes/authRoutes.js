const express = require('express');
const router = express.Router();
const { register, login, verifyToken } = require('../controllers/authController');
const { registerValidationRules, validate, loginValidationRules } = require('../validators/authValidators');

// User Basic Routes
router.post('/register',registerValidationRules, validate, register);
router.post('/login', loginValidationRules, validate, login);

router.get('/verify-token', verifyToken );

router.get("/", (req, res) => {
    res.send(
      "<h1>Welcome to the auth routes Service!</h1><p>Use the /api/auth route to manage projects.</p>"
    );
  });


module.exports = router;
