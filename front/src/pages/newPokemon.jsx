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
        let request = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pokemon/getPokeData`)
        if(request.data) {
          console.log(request.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    requestToAPI()
  }


  return (
    <div>
      <p>New Poke Page</p>
      <input type='text' value={inputtedText} onChange={ChangeHandler} />
      <button onClick={submitHandler}>submit</button>
    </div>
  );
}
export default NewPokemon;