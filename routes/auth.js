const express = require("express");
const authController = require('../controllers/auth')
const router = express.Router();

console.log('\n\n\n\783468238973428,bkjdsa\n\n\n\n');

router.post('/register', authController.register );

router.post('/login', authController.login );



module.exports = router;