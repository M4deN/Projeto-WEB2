const express = require('express');
const User = require("../models/user");
const router = express.Router();


// Rota alterar user
router.post('/alterar/:id', async (req, res) => { 
    try {
        // Verificar se há um usuário na sessão
        if (req.session.user) {
          const userId = req.params.id;
          const { email, senha, nome } = req.body;
          const user = req.session.user;
    
          if (user._id.toString() !== userId) {
            const errorMessage = 'Acesso não autorizado';
            res.send(`<script>alert("${errorMessage}"); window.location.href = "/login";</script>`);
            return;
          }
          // Buscar o usuário existente pelo ID
          const existingUser = await User.findById(userId);
          if (existingUser) {
            existingUser.email = email;
            existingUser.senha = senha;
            existingUser.nome = nome;
            await existingUser.save();
            // Atualizar o usuário na sessão
            req.session.user = existingUser;
            const successMessage = 'Dados atualizados com sucesso';
            res.send(`<script>alert("${successMessage}"); window.location.href = "/";</script>`);
          } else {
            const errorMessage = 'Usuário não encontrado';
            res.send(`<script>alert("${errorMessage}"); window.location.href = "/login";</script>`);
          }
        } else {
          res.redirect('/login');
        }
      } catch (error) {
        console.error('Erro ao atualizar dados do usuário:', error);
        res.status(500).send('Erro ao atualizar dados do usuário');
      }
    });

module.exports = router;