import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom'

import Header from './components/header/header'
import Landing from './pages/Landing';
import Pokemon from './pages/Pokemon'
import NewPokemon from './pages/newPokemon';
import FavoritePokemons from './pages/favPokemons';
import Login from './pages/auth/login';
import RegisterAccount from './pages/auth/register';
import ForgotPassword from './pages/auth/forgotpassword';
import PasswordReset from './pages/auth/passwordReset';
import TestEmailPage from './pages/testEmail';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/pokemon' element={<Pokemon />} />
        <Route path='/testemail' element={<TestEmailPage />} />
        <Route path='/newpoke' element={<NewPokemon />} />
        <Route path='/favpoke' element={<FavoritePokemons />} />
        <Route path='/account/login' element={<Login />} />
        <Route path='/account/register' element={<RegisterAccount />} />
        <Route path='/account/forgotPassword' element={<ForgotPassword />} />
        <Route path='/account/forgotPassword/:id' element={<PasswordReset />} />
      </Routes>
    </Router>
  );
}

export default App;
