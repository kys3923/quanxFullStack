const axios = require('axios')
const Pokemon = require('../models/pokemon')

exports.getAllPokemon = async (req, res) => {
  let pokeData 

  try {
    let request = await axios.get(`https://pokeapi.co/api/v2/pokemon/16`)
    if(request.data) {
      pokeData = request.data
    }
  } catch (error) {
    res.status(421).json({
      sucess: false,
      message: 'Error at getting data from pokeAPI'
    })
  }

  res.status(200).json({
    success: true,
    pokemon: pokeData
  })
}

exports.selectPokemon = async (req, res) => {

  let recievedPokeId = req.params.id
  let pokeData
  let allMongoPokemon

  try {
    let request = await axios.get(`https://pokeapi.co/api/v2/pokemon/${recievedPokeId}`)
    if(request.data) {
      pokeData = request.data
      allMongoPokemon = await Pokemon.find()
      let createdPokemon = allMongoPokemon.find((pokemon) => pokemon.id === Number(recievedPokeId))
      if(!createdPokemon) {
        createdPokemon = await Pokemon.create({
          name: pokeData.name,
          id: pokeData.id,
          img: pokeData.sprites.front_default
        })  
      }

    } 
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to poke API'
    })
  }

  // save to mongoDB
  
  return res.status(200).json({
    success: true,
    pokemon: pokeData
  })
}

exports.getAllFavPokemon = async (req, res) => {
  let allFavPokemons
  try {
    allFavPokemons = await Pokemon.find()
  } catch (erro) {
    return res.status(400).json({
      success: false,
      message: 'error at finding all pokemons from mongoDB'
    })
  }

  return res.status(200).json({
    success: true,
    pokemons: allFavPokemons
  })
}

exports.deleteFavPokemon = async (req, res) => {
  console.log(req.params.id)

  let id = req.params.id
  let deletedPokemon
  try {
    deletedPokemon = await Pokemon.findOneAndDelete({id: id
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'error at deleting pokemon from mongoDB'
    })
  }

  return res.status(200).json({
    success: true,
    message: 'pokemon has been deleted'
  })
}