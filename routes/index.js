var express = require('express');
var router = express.Router();
const fs = require('fs');
const { enviarEmail } = require('../public/javascripts/email');

module.exports = (app) => {
  // Rota da página login
  app.get('/login', (req, res) => {
    res.render('login');
  });

  // Rota de autenticação do login
  app.post('/login', (req, res) => {
    const { username1, password2 } = req.body;
    if (username1 === 'teste@email.com' && password2 === '1234') {
      res.redirect('/');
    } else {
      // Exibir uma mensagem de erro
      const script = `
        <script>
          alert('Credenciais inválidas. Por favor, tente novamente.');
          window.location.href = '/login';
        </script>
      `;
      res.send(script);
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
};

