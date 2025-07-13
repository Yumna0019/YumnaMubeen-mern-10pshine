const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  forgotPassword,
  resetPassword, 
  sendResetOTP, 
  verifyOTP
} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/', resetPassword);
router.post("/send-reset-otp", sendResetOTP);
router.post("/verify-otp", verifyOTP);

module.exports = router;
