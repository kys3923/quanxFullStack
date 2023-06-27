const express = require('express')
const router = express.Router()

const {getAllPokemon, selectPokemon} = require('../controllers/pokemon')


router.route('/getPokeData').get(getAllPokemon)
router.route('/getPokeData/:id').put(selectPokemon)

module.exports = router