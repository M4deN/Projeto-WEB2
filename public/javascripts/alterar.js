const express = require('express');
const User = require("../javascripts/user");

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, senha, nome } = req.body;

  try {
    // Buscar o usuário existente pelo email
    const user = await User.findOne({ email });

if (user) {
  // Atualizar os dados do usuário
  user.email = email;
  user.senha = senha;
  user.nome = nome;

  // Salvar as alterações no banco de dados
  await user.save();

  // Redirecionar para a página de login
  res.redirect('/login');
} else {
  // Usuário não encontrado
  const errorMessage = 'Usuário não encontrado';
  res.send(`<script>alert("${errorMessage}"); window.location.href = "/login";</script>`);
}
  } catch (error) {
    // Erro ao buscar/atualizar o usuário
    console.error('Erro ao buscar/atualizar usuário no MongoDB:', error);
    res.status(500).send('Erro ao atualizar usuário');
  }
});

module.exports = router;
