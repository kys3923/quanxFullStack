import axios from 'axios'
import { useState, useEffect } from 'react'

const NewPokemon = (props) => {

  const [ inputtedText, setInputtedText ] = useState('')
  const [ recievedData, setRecievedData ] = useState()


  const ChangeHandler = (e) => {
    setInputtedText(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const requestToAPI = async () => {
      try {
        let request = await axios.put(`${process.env.REACT_APP_SERVER_URL}/pokemon/getPokeData/${inputtedText}`)
        if(request.data) {
          console.log(request.data)
          setRecievedData(request.data.pokemon)
        }
      } catch (error) {
        console.log(error)
      }
    }

    requestToAPI()
  }


  return (
    <div className='p-8'>
      <div className='flex flex-col'>
        <input type='text' value={inputtedText} onChange={ChangeHandler} className='border border-gray-300' />
        <button onClick={submitHandler} className='bg-green-500 text-white hover:bg-green-300'>submit</button>
      </div>
      <div className='flex flex-col'>
        {recievedData && <div className='flex flex-col items-center'>
            <div>
              <img src={recievedData.sprites.front_default} />
            </div>
            <div className='border border-gray-300 rounded-md p-4'>
              <div className='grid grid-cols-2 w-full gap-4'>
                <p>Pokemon ID:</p>
                <p>{recievedData.id}</p>
              </div>
              <div className='grid grid-cols-2 w-full gap-4'>
                <p>Pokemon Name:</p>
                <p>{recievedData.species.name}</p>
              </div>
            </div>

          </div>
        }
      </div>
    </div>
  );
}
export default NewPokemon;