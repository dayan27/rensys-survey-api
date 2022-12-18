const express = require("express");
const authAuthenticate= require('../middleware/authenticate');
const router = express.Router();
const {createUser, forgotPassword, login, verifyToken, resetForgotPassword, sendSMS1,resetPassword} = require('../controllers/auth')
router.route('/').post(createUser);
router.post('/forgot-password',forgotPassword);
router.put('/password-reset',authAuthenticate,resetPassword);
router.post('/login',login);
router.post('/verify-token', verifyToken);
router.post('/reset-forgot-password', authAuthenticate,resetForgotPassword)
router.get('/send-sms', sendSMS1)
module.exports = router;   