// Importação das bibliotecas necessárias
const express = require('express');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const path = require('path');

// Configuração do dotenv para carregar as variáveis de ambiente
dotenv.config();

// Inicialização do aplicativo Express
const app = express();
app.use(express.static('public'));
// Configuração do middleware para processar os dados do formulário
app.use(express.urlencoded({ extended: false }));

// Configuração do diretório público para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota da página inicial
app.get('/', (req, res) => {
  res.render('index');
});

// Rota da página de descrição do projeto
app.get('/descricao', (req, res) => {
  res.render('descricao');
});

// Rota da página de tecnologias utilizadas
app.get('/tecnologias', (req, res) => {
  res.render('tecnologias');
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

