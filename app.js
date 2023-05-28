const express = require('express');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const { enviarEmail } = require('../Projeto_WEB/public/javascripts/email');

// Configuração do dotenv para carregar as variáveis de ambiente
dotenv.config();

// Inicialização do aplicativo Express
const app = express();

// Configuração do middleware para processar os dados do formulário
app.use(express.urlencoded({ extended: false }));

// Configuração do diretório público para servir arquivos estáticos
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Rota da página login
app.get('/login', (req, res) => {
  res.render('login');
});

// Rota de autenticação do login
app.post('/login', (req, res) => {
  const { username1, password2 } = req.body;
  // Verificar se as credenciais de login estão corretas
  if (username1 === 'teste@email.com' && password2 === '1234') {
    res.redirect('/');
  } else {
    // Exibir uma mensagem de erro usando o SweetAlert
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
  res.render('desenvolvedor');
});

// Rota da página de contato
app.get('/contato', (req, res) => {
  res.render('contato');
});

// Rota para o envio do formulário de contato
app.post('/contato/enviar', enviarEmail);


// Configuração do template engine EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Exportação do servidor
module.exports = app;

