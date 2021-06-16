const express = require('express')
const authController = require('../controller/authController')

const router = express.Router()

router.post('/api/v1/signup',authController.signup) 
router.post('/api/v1/login',authController.login) 
router.patch('/api/v1/edit-profile',authController.editProfile)

module.exports = router