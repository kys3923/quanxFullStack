const express = require('express')
const router = express.Router()

const {getAllPokemon} = require('../controllers/pokemon')


router.route('/getPokeData').get(getAllPokemon)

module.exports = router