const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')

exports.login = async (req, res, next) => {

  const { email, password } = req.body

  if(!email || !password) {
    return next(new ErrorResponse('Please provide an email ans password', 400))
  }

  try {
    const user = await User.findOne({email}).select('+password')

    if(!user) {
      return next(new ErrorResponse('Invalid Credentials', 401))
    }

    const isMatch = await user.matchPasswords(password)

    if(!isMatch) {
      return next(new ErrorResponse('Invalid Credientials', 401))
    }

    sendToken(user, 200, res)
  } catch (Error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }

}

exports.register = async (req, res, next) => {

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

exports.testEmail = async (req, res, next) => {
  const { emailTo, emailFrom, emailContent } = req.body

  const emailMsg = `
    <!DOCTYPE html>
    <html>
    <title>Test Email</title>
    <head>
    </head>
    <body
        style='width: 100%; background-color: #fdfdfd; '
    >
    <h1>This is Test Email</h1>
    <p>${emailContent}</p>
    </body>
    </html>
  `

  const sendTestEmail = async () => {
    try {
      await sendEmail({
        to: emailTo,
        from: emailFrom,
        subject: 'Test Email',
        html: emailMsg
      })
    } catch (error) {
      console.log(error)
    }
  } 

  sendTestEmail()

  return res.status(200).json({
    success: true,
  })

}

exports.forgotPassword = async (req, res, next) => {

  const { email } = req.body

  try {
    const user = await User.findOne(({email: email}))

    if(!user) {
      return res.status(400).json({
        success: false,
        message: 'Email was not found'
      })
    }

    const resetToken = user.getResetPasswordToken()

    await user.save()

    // Sent Email

    const emailMsg = `
      <body>
        <h1>This is password reset link</h1>

        <a href='${process.env.FRONT_URL}/account/forgotPassword/${resetToken}'>Click here to reset password.</a>
      </body>
    `
    await sendEmail({
      to: email,
      from: 'kys3923fang@gmail.com',
      subject: 'Reset Password link',
      html: emailMsg
    })

    res.status(200).json({
      success: true,
      resetUrl: resetToken
    })

  } catch (error) {
    next(error)
  }
}

exports.passwordReset = async (req, res, next) => {

  const resetToken = req.params.id
  const { password } = req.body

  const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  try {
    const user = await User.findOne({resetPasswordToken: resetPasswordToken, resetPasswordExpire: {$gt: Date.now()}})

    if(!user) {
      return res.status(403).json({
        success: false,
        message: 'Token may have been expired'
      })
    }

    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    // send Email

    return res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    next(error)
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