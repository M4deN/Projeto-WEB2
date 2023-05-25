var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Rota de login */
router.post('/login', function(req, res, next) {
  // Lógica de autenticação e validação do login
  // ...
  // Se o login for válido, redirecionar ou retornar uma resposta adequada
  // Se o login for inválido, exibir mensagem de erro
});

module.exports = router;
