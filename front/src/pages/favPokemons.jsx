import { useState, useEffect} from 'react'
import axios from 'axios'

const FavoritePokemons = (props) => {

  const [ receivedPokemons, setReceivedPokemons ] = useState([])

  useEffect(() => {
    let isMounted = true
    const requestToAPI = async () => {
      const request = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pokemon/getPokeData/allfavorite`)
      if(request.data.success) {
        console.log(request.data)
        setReceivedPokemons(request.data.pokemons)
      } 
    }
    requestToAPI()
    return () => {
      isMounted = false
    }
  },[])

  const deleteFavBtnHandler = (e, id) => {
    const requestToDelete = async () => {
      const request = await axios.put(`${process.env.REACT_APP_SERVER_URL}/pokemon/deleteFavPokemon/${id}`)
      if(request.data.success) {
        console.log('deleted')
        window.location.reload(false)
      } 
    }
    requestToDelete()
  }

  return (
    <div className='flex flex-col items-center'>
      <p>Fav Pokemons</p>
      <div className='flex flex-col gap-4'>
        {receivedPokemons.length > 0 && receivedPokemons.map((poke) => {
          return <div
            key={poke._id}
            className=' p-8 border border-gray-400 rounded-md'
          >
            <img src={poke.img} />
            <p>{poke.name}</p>
            <p>{poke.id}</p>
            <button 
              className='bg-red-700 text-white font-bold px-4 py-2 hover:bg-red-400'
              onClick={(e) => deleteFavBtnHandler(e, poke.id)}
            >Delete from Favorite</button>
          </div>
        })
        }
      </div>
    </div>
  );
}
export default FavoritePokemons;