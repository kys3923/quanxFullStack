import axios from 'axios'
import { useState, useEffect } from 'react'
 
const PokemonLanding = (props) => {

  const [ inputtedText, setInputtedText ] = useState('')
  const [ receivedData, setReceivedData ] = useState()

  console.log(process.env.REACT_APP_OMDB)
  let omdbAdress = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB}/t=die+hard`

  const changHandler = (e) => {
    setInputtedText(e.target.value)
  }

  const buttonHandler = (e) => {
    e.preventDefault()

    if(inputtedText === '') {
      return
    }

    const requestToAPI = async () => {
      try {
        const request = await axios.get(`https://pokeapi.co/api/v2/pokemon/${inputtedText}`)
        if(request.data) {
          console.log(request.data)
          setReceivedData(request.data)
        }
      } catch (error) {
        alert(error.response.data)
      }
    }

    requestToAPI()
  }

  return (
    <section className='flex flex-col'>
      <p>Landing</p>
      <input 
        type='text' 
        className='border border-gray-300 rounded-md px-2' 
        value={inputtedText} 
        onChange={(e) => changHandler(e)}/>
      <button className='bg-red-500 text-white' onClick={buttonHandler}>Submit</button>
      {receivedData &&
        <div className='flex flex-col items-center'>
          <div>
            <img src={receivedData.sprites.front_default} alt='poke Image' />
          </div>
          <div>
          <div className='grid grid-cols-2'>
            <p>name:</p>
            <p>{receivedData.name}</p>
          </div>
          <div className='grid grid-cols-2'>
            <p>Id:</p>
            <p>{receivedData.id}</p>
          </div>

          </div>
          {/* {receivedData.varieties.length > 0 ? 
            receivedData.varieties.map((pokemon, i) => {
              return <div key={i + 20000}>
                <p>{pokemon.pokemon.name}</p>
                <p>{pokemon.pokemon.url}</p>
              </div>
            })
          :
           <p>No similar species</p>
          } */}
        </div>
      }
    </section>
  );
}
export default PokemonLanding;