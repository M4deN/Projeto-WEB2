const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require("../../models/user");

const router = express.Router();

// Rota de login
router.post('/', [
  check('email').isEmail().withMessage('E-mail inválido'),
  check('senha').notEmpty().withMessage('Senha não pode estar vazia'),
], async (req, res) => {
  const { senha, email } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Se houver erros de validação, exiba as mensagens de erro
      const errorMessage = errors.array()[0].msg;
      res.send(`<script>alert("${errorMessage}"); window.location.href = "/login";</script>`);
      return;
    }

    const user = await User.findOne({ email });

    if (user) {
      if (senha === user.senha) {
        // Definicao dos dados na sessão
        req.session.user = user;

        const welcomeMessage = `Bem-vindo, ${user.nome}!`;
        res.send(`<script>alert("${welcomeMessage}"); window.location.href = "/";</script>`);

      } else {
        const errorMessage = 'Senha inválida';
        res.send(`<script>alert("${errorMessage}"); window.location.href = "/login";</script>`);
      }
    } else {
      const errorMessage = 'Usuário não encontrado';
      res.send(`<script>alert("${errorMessage}"); window.location.href = "/login";</script>`);
    }
  } catch (error) {
    console.error('Erro ao realizar o login:', error);
    const errorMessage = 'Erro ao realizar o login';
    res.send(`<script>alert("${errorMessage}"); window.location.href = "/login";</script>`);
  }
});

module.exports = router;