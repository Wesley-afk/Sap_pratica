import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'

const Home = () => {
  return (
    <div>
    <NavBar />
    Bem-vindo(a) a home
    <Link to="/cadastro_usuario">Cadastre-se</Link>
    </div>
  )
}

export default Home