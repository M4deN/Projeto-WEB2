const express = require('express');
const User = require("../javascripts/user");

const router = express.Router();

router.post('/', (req, res) => {
  const { email, senha, nome } = req.body;

  const newUser = new User({ email, senha, nome });

  newUser.save()
    .then(() => {
      // Sucesso ao salvar o usuário
      res.redirect('/login');
    })
    .catch((error) => {
      // Erro ao salvar o usuário
      console.error('Erro ao salvar usuário no MongoDB:', error);
      res.status(500).send('Erro ao cadastrar usuário');
    });
});

module.exports = router;
