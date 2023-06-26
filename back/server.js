const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()

// middleware
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json())

// routes
app.get('/', (req, res) => {
  res.json({
    message: 'server is running'
  })
})

app.get('/test', (req, res) => {
  res.json({
    message: 'this is test route'
  })
})

// controllers
app.use('/pokemon', require('./routes/pokemon'))

let server = app.listen(process.env.PORT || 8000, () => console.log(`server is running at 8000`))

module.exports = server;