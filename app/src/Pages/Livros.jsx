import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import Card from "../components/Card.jsx";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Livros = () => {
  const [livros, setLivros] = useState([]);
  const [categoria, setCategoria] = useState("todas");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/CarregarCardsDeLivros")
      .then((res) => res.json())
      .then((data) => setLivros(data))
      .catch((err) => console.error("Erro ao buscar livros:", err));
  }, []);

  const categorias = ["todas", ...Array.from(new Set(livros.map(l => l.genero)))];

  const livrosFiltrados = categoria === "todas"
    ? livros
    : livros.filter(livro => livro.genero === categoria);

  return (
    <div>
      <Container>
        <NavBar />
        <section style={{marginTop: '5vh'}}>
          <h1>Seus Livros aqui</h1>
          <Form.Select
            style={{ maxWidth: 300, marginBottom: 24 }}
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          >
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </Form.Select>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {livrosFiltrados.length > 0 ? (
              livrosFiltrados.map((livro) => (
                <Card
                  key={livro.id_livro}
                  titulo={livro.titulo_livro}
                  desc={`Autor: ${livro.nome_autor} | Gênero: ${livro.genero}`}
                  img={livro.imagem_url}
                  status={livro.status}
                  but={
                    <Button variant="success" onClick={() => navigate(`/editar_livro/${livro.id_livro}`)}>
                      Editar
                    </Button>
                  }
                />
              ))
            ) : (
              <p>Sem livro cadastrado ainda</p>
            )}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Livros;