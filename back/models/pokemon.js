const mongoose = require('mongoose')

const pokemonSchema = new mongoose.Schema({
  name: String,
  id: Number,
  img: String,
}, {timestamps: true})

const Pokemon = mongoose.model('Pokemons', pokemonSchema)

module.exports = Pokemon