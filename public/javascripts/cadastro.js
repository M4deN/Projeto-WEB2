const express = require('express');
const User = require("../javascripts/user");

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, senha, nome } = req.body;

  try {
    const newUser = new User({ email, senha, nome });
    await newUser.save();

    // Sucesso ao cadastrar o usuário
    const successMessage = 'Usuário cadastrado com sucesso';
    res.send(`<script>alert("${successMessage}"); window.location.href = "/login";</script>`);
  } catch (error) {
    // Erro ao salvar o usuário
    console.error('Erro ao salvar usuário no MongoDB:', error);
    res.status(500).send('Erro ao cadastrar usuário');
  }
});

module.exports = router;
