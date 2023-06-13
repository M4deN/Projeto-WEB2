const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Importação confiogurção .ENV
dotenv.config();

// Inicialização do aplicativo Express
const app = express();
const mongoDBURL = process.env.MONGODB_URL;

// Configuração do middleware para processar os dados do formulário
app.use(express.urlencoded({ extended: false }));

// Adicionando a middleware do bodyParser
app.use(bodyParser.json()); 

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
    console.error('Falha na conexão com o MongoDB:', error);
  });

// Importação das rotas
routes(app);

// Exportação do servidor
module.exports = app;