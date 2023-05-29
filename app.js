const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const routes = require('../Projeto_WEB/routes/index');
dotenv.config();

// Inicialização do aplicativo Express
const app = express();

// Configuração do middleware para processar os dados do formulário
app.use(express.urlencoded({ extended: false }));

// Configuração do diretório público para servir arquivos estáticos
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Configuração das rotas
routes(app);

// Configuração do template engine EJS
app.set('views', path.join(__dirname, 'views'));

// Exportação do servidor
module.exports = app;
