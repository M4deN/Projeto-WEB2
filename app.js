const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


dotenv.config();

// Inicialização do aplicativo Express
const app = express();
const mongoDBURL = process.env.MONGODB_URL;

// Configuração do middleware para processar os dados do formulário
app.use(express.urlencoded({ extended: false }));


app.use(bodyParser.json()); // Adicionando a configuração do bodyParser

// Configuração do diretório público para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Conexão com o MongoDB
mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida.');
  })
  .catch((error) => {
    const errorMessage = `Erro ao conectar ao MongoDB: ${error}`;
    const script = `<script>alert("${errorMessage}"); window.location.href = "/livros/adicionar";</script>`;
    res.send(script);
    console.error('Falha na conexão com o MongoDB:', error);
  });

// Configuração das rotas
routes(app);

// Exportação do servidor
module.exports = app;