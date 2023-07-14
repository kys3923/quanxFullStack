const express = require('express')
const router = express.Router()

const { login, register, forgotPassword, passwordReset, testEmail } = require('../controllers/auth')


router.route('/login').post(login)
router.route('/register').post(register)
router.route('/testEmail').post(testEmail)
router.route('/forgotPassword').post(forgotPassword)
router.route('/passwordReset/:id').put(passwordReset)

module.exports = router