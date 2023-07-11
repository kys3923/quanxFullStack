const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const crypto = require('crypto')

exports.login = async (req, res) => {
  console.log('yay')
}

exports.register = async (req, res) => {
  console.log(req.body, 'yay')

  const { username, email, password, address, contact } = req.body

  try {
    const user = await User.create({
      username,
      email,
      password,
      address,
      contact
    })

    sendToken(user, 201, res)
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: 'register now successful'
    })
  }
}

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken()
  res.status(statusCode).json({
    sucess: true,
    token,
    userId: user._id
  })
}