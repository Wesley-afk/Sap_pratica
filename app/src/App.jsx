import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import CadastroUsuarios from './Pages/cadastro_usuarios.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home.jsx'; 
import Livros from './Pages/Livros.jsx';
import CadastroLivros from './Pages/Cadastro_livros.jsx'
import Editar_livros from './Pages/Editar_livros.jsx';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/cadastro_usuario' element={<CadastroUsuarios/>}/>
        <Route path='/livros' element={<Livros/>}/>
        <Route path='/cadastro_livros' element={<CadastroLivros/>}/>
        <Route path='/editar_livro/:id' element={<Editar_livros/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
