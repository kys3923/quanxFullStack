const express = require('express')
const router = express.Router()

const {getAllPokemon, selectPokemon, getAllFavPokemon, deleteFavPokemon} = require('../controllers/pokemon')


router.route('/getPokeData').get(getAllPokemon)
router.route('/getPokeData/:id').put(selectPokemon)
router.route('/getPokeData/allfavorite').get(getAllFavPokemon)
router.route('/deleteFavPokemon/:id').put(deleteFavPokemon)

module.exports = router