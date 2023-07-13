const express = require('express')
const router = express.Router()

const { login, register, forgotPassword, passwordReset } = require('../controllers/auth')


router.route('/login').post(login)
router.route('/register').post(register)
router.route('/forgotPassword').post(forgotPassword)
router.route('/passwordReset/:id').put(passwordReset)

module.exports = router