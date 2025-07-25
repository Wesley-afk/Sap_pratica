import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const Editar_livros = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livro, setLivro] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/CarregarLivro/${id}`)
      .then((res) => res.json())
      .then((data) => setLivro(data))
      .catch((err) => console.error("Erro ao carregar livro:", err));
  }, [id]);

  const handleChange = (e) => {
    setLivro({ ...livro, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/AtualizarLivro/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Livro atualizado com sucesso!");
        navigate("/livros");
      })
      .catch((err) => alert("Erro ao atualizar livro!"));
  };

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja deletar este livro?")) {
      fetch(`http://localhost:3000/DeletarLivro/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Livro deletado com sucesso!");
          navigate("/livros");
        })
        .catch((err) => alert("Erro ao deletar livro!"));
    }
  };

  return (
    <div>
      <Container>
        <NavBar />
        <h5>Editar informações do livro</h5>
        {livro && (
          <Form onSubmit={handleSubmit}>
            <Row className="justify-content-center mt-4">
              <Col xs={12} md={6} className="d-flex flex-column align-items-center">
                <Form.Group className="mb-3" style={{ width: "100%" }}>
                  <Form.Label>Imagem</Form.Label>
                  <Form.Control
                    type="text"
                    name="imagem_url"
                    placeholder="Altere a url aqui"
                    value={livro.imagem_url}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Image
                  src={livro.imagem_url}
                  alt="Capa do livro"
                  rounded
                  fluid
                  style={{ maxHeight: "350px" }}
                  className="mb-3"
                />

                <Form.Group className="mb-3" style={{ width: "100%" }}>
                  <Form.Label>Autor</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome_autor"
                    placeholder="Altere o nome aqui"
                    value={livro.nome_autor}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" style={{ width: "100%" }}>
                  <Form.Label>Gênero</Form.Label>
                  <Form.Control
                    type="text"
                    name="genero"
                    placeholder="Altere o genero aqui"
                    value={livro.genero}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" style={{ width: "100%" }}>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={livro.status}
                    onChange={handleChange}
                  >

                    <option value="Lido">Lido</option>
                    <option value="Lendo">Lendo</option>
                    <option value="Quero ler">Quero ler</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    Deletar livro
                  </Form.Label>
                  <Button variant="danger" onClick={handleDelete} style={{ display: "block" }}>
                      Excluir
                  </Button>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Salvar alterações
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Container>
    </div>
  );
};

export default Editar_livros;