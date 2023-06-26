const axios = require('axios')

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