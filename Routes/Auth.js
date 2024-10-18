const express = require('express')
const {signUpValidation,loginValidation} = require('../MiddleWares/Validation');
const { signUp,login } = require('../Controllers/AuthController');

const router = express.Router();

router.post('/login',loginValidation,login);
// url middleware - to validate data controller - Controller
router.post('/signup',signUpValidation,signUp)

module.exports = router;