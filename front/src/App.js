import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom'

import Header from './components/header/header'
import Landing from './pages/Landing';
import Pokemon from './pages/Pokemon'
import NewPokemon from './pages/newPokemon';
import FavoritePokemons from './pages/favPokemons';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/pokemon' element={<Pokemon />} />
        <Route path='/newpoke' element={<NewPokemon />} />
        <Route path='/favpoke' element={<FavoritePokemons />} />
      </Routes>
    </Router>
  );
}

export default App;
