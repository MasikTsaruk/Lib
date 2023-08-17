const express = require("express");
const router = express.Router();
const authController = require('../controllers/authControllers')


router.post('/login', authController.logIn)
router.post('/register', authController.register)

module.exports = router;