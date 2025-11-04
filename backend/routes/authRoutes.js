const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  forgotPassword,
  resetPassword, 
  sendResetOTP, 
  verifyOTP, getMe
} = require('../controllers/authController');
const protect = require("../middleware/authMiddleware"); 

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/', resetPassword);
router.post("/send-reset-otp", sendResetOTP);
router.post("/verify-otp", verifyOTP);
router.get('/me', protect, getMe); 

module.exports = router;
