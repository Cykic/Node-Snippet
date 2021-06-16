const express = require('express')
const authController = require('../controller/authController')

const router = express.Router()

router.post('/signup',authController.signup) 
router.post('/login',authController.login) 
router.patch('/edit-profile',authController.editProfile)

module.exports = router