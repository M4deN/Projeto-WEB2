const express = require('express');
const router = express.Router();
const fs = require('fs');
const { enviarEmail } = require('../public/javascripts/email');
const livrosController = require('../controllers/livrosController');

module.exports = (app) => {
  // Rota da página login
  app.get('/login', (req, res) => {
    res.render('login');
  });

  // Rota de autenticação do login
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'senha123') {
      res.redirect('/');
    } else {
      const mensagemErro = 'Credenciais inválidas. Por favor, tente novamente.';
      res.status(401).render('login', { error: mensagemErro });
    }
  });

  // Rota da página inicial
  app.get('/', (req, res) => {
    const tecnologia = fs.readFileSync('./conteudo/index.txt', 'utf8');
    res.render('index', { conteudo: tecnologia });
  });

  // Rota da página de descrição do projeto
  app.get('/descricao', (req, res) => {
    const tecnologia = fs.readFileSync('./conteudo/descricao.txt', 'utf8');
    res.render('descricao', { conteudo: tecnologia });
  });

  // Rota da página de tecnologias utilizadas
  app.get('/tecnologia', (req, res) => {
    const tecnologia = fs.readFileSync('./conteudo/tecnologia.txt', 'utf8');
    res.render('tecnologia', { conteudo: tecnologia });
  });

  // Rota da página de desenvolvedores
  app.get('/desenvolvedor', (req, res) => {
    const desenvolvedor = fs.readFileSync('./conteudo/desenvolvedor.txt', 'utf8');
    res.render('Desenvolvedor', { conteudo: desenvolvedor });
  });

  // Rota da página de contato
  app.get('/contato', (req, res) => {
    res.render('contato');
  });

  // Rota para o envio do formulário de contato
  app.post('/contato/enviar', enviarEmail);

  // Rotas da API REST

  // GET /livros: Obter a lista de todos os livros
  app.get('/livros', livrosController.obterLivros);

  // POST /livros: Adicionar um novo livro
  app.post('/livros', livrosController.adicionarLivro);

  // GET /livros/{id}: Obter detalhes de um livro específico
  app.get('/livros/:id', livrosController.obterDetalhesLivro);

  // PUT /livros/{id}: Atualizar as informações de um livro específico
  app.put('/livros/:id', livrosController.atualizarLivro);

  // DELETE /livros/{id}: Excluir um livro específico
  app.delete('/livros/:id', livrosController.excluirLivro);
};

