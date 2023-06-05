const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require("../javascripts/user");

const router = express.Router();

router.post('/', [
  check('email').isEmail().withMessage('O e-mail fornecido é inválido'),
  check('senha').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
], async (req, res) => {
  const { email, senha, nome } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      const errorMessage = errorMessages.join(', ');
      return res.send(`<script>alert("${errorMessage}"); window.location.href = "/cadastro";</script>`);
    }

    const newUser = new User({ email, senha, nome });
    await newUser.save();

    // Sucesso ao cadastrar o usuário
    const successMessage = 'Usuário cadastrado com sucesso';
    res.send(`<script>alert("${successMessage}"); window.location.href = "/login";</script>`);
  } catch (error) {
    // Erro ao salvar o usuário
    console.error('Erro ao salvar usuário no MongoDB:', error);
    const errorMessage = 'Erro ao cadastrar usuário';
    res.send(`<script>alert("${errorMessage}"); window.location.href = "/cadastro";</script>`);
  }
});

module.exports = router;
