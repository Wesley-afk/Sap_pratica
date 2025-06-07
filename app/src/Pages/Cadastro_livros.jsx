import React, { useState } from "react";
import NavBar from "../components/NavBar.jsx";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Cadastro_livros = () => {
  const [titulo, setTitulo] = useState("");
  const [nome_autor, setnome_autor] = useState("");
  const [genero, setgenero] = useState("");
  const [imagem, setimagem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const livro = { titulo, nome_autor, genero, imagem };
    fetch("http://localhost:3000/cadastroDeLivros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Livro cadastrado com sucesso:", data);
        alert("cadastrado com sucesso!");
        navigate("/livros");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar livro:", error);
      });
  };

  return (
    <div>
      <Container>
        <NavBar />

        <h3>Cadastro de livros</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Titulo do livro</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o título do livro"
              onChange={(e) => setTitulo(e.target.value)}
              value={titulo}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nome do autor</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome do autor"
              onChange={(e) => setnome_autor(e.target.value)}
              value={nome_autor}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gênero do livro</Form.Label>
            <Form.Control
              type="text"
              placeholder="ação, aventura, romance"
              onChange={(e) => setgenero(e.target.value)}
              value={genero}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Capa do livro</Form.Label>
            <Form.Control
              type="url"
              placeholder="copie e cole o endereço"
              value={imagem}
              onChange={(e) => setimagem(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Cadastro_livros;