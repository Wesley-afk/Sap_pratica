import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import Card from "../components/Card.jsx";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Livros = () => {
  const [livros, setLivros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/CarregarCardsDeLivros")
      .then((res) => res.json())
      .then((data) => setLivros(data))
      .catch((err) => console.error("Erro ao buscar livros:", err));
  }, []);

  return (
    <div>
      <Container>
        <NavBar />
        <h1>Seus Livros aqui</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {livros.map((livro) => (
            <Card
              key={livro.id_livro}
              titulo={livro.titulo_livro}
              desc={`Autor: ${livro.nome_autor} | Gênero: ${livro.genero}`}
              img={livro.imagem_url}
              but={
                <Button variant="success" onClick={() => navigate(`/editar_livro/${livro.id_livro}`)}>
                  Editar
                </Button>
              }
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Livros;