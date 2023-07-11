import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom'

import Header from './components/header/header'
import Landing from './pages/Landing';
import Pokemon from './pages/Pokemon'
import NewPokemon from './pages/newPokemon';
import FavoritePokemons from './pages/favPokemons';
import Login from './pages/auth/login';
import RegisterAccount from './pages/auth/register';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/pokemon' element={<Pokemon />} />
        <Route path='/newpoke' element={<NewPokemon />} />
        <Route path='/favpoke' element={<FavoritePokemons />} />
        <Route path='/account/login' element={<Login />} />
        <Route path='/account/register' element={<RegisterAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
