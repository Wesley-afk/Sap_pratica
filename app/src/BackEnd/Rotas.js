import express from 'express';
import cors from 'cors';
import connection from './db.js';

const app = express();
app.use(cors());
app.use(express.json());





// Rotas para a página de cadastro de usuários
app.post('/cadastro', (req, res) => {
    const { nome, email } = req.body;

    const query = 'INSERT INTO usuario (nome, email) VALUES(?, ?)';
    connection.query(query, [nome, email], (error, results) => {
        if(error){
            console.log("Erro ao cadastrar usuário:", error);
            return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
        }

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    })

})




// Rotas para a página de cadastro de livros
app.post('/cadastroDeLivros', (req, res) => {
    const {titulo, nome_autor, genero, imagem} = req.body;

    const query = 'INSERT INTO livros (titulo_livro, nome_autor, genero, imagem_url) VALUES(?, ?, ?, ?)';
    connection.query(query, [titulo, nome_autor, genero, imagem], (error, results) => {
        if(error){
             console.log("Erro ao cadastrar livro:", error);
            return res.status(500).json({ error: 'Erro ao cadastrar livro' });
        }
         res.status(201).json({ message: 'Livro cadastrado com sucesso!' });
    })
})


app.get('/CarregarCardsDeLivros', (req, res) => {
    const query = 'SELECT * FROM livros';
    connection.query(query, (error, results) => {
        if (error) {
            console.log("Erro ao buscar livros:", error);
            return res.status(500).json({ error: 'Erro ao buscar livros' });
        }
        res.status(200).json(results);
    });
});


app.get('/CarregarLivro/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM livros WHERE id_livro = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.log("Erro ao buscar livro:", error);
            return res.status(500).json({ error: 'Erro ao buscar livro' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.status(200).json(results[0]);
    });
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});

export default app;