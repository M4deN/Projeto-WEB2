// Importação das bibliotecas necessárias
const express = require('express');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

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
app.get('/desenvolvedores', (req, res) => {
  res.render('desenvolvedores');
});

// Rota da página de contato
app.get('/contato', (req, res) => {
  res.render('contato');
});

// Rota para o envio do formulário de contato
app.post('/contato/enviar', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  // Configuração do nodemailer para enviar o e-mail
  const transporter = nodemailer.createTransport({
    service: 'nome_do_servico_de_email',
    auth: {
      user: process.env.EMAIL_USUARIO,
      pass: process.env.EMAIL_SENHA,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USUARIO,
    to: process.env.EMAIL_DESTINO,
    subject: assunto,
    text: `Nome: ${nome}\nE-mail: ${email}\n\n${mensagem}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Ocorreu um erro ao enviar a mensagem.');
    } else {
      console.log('E-mail enviado: ' + info.response);
      res.send('Mensagem enviada com sucesso!');
    }
  });
});

// Configuração do template engine EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Inicialização do servidor
module.exports = app;

