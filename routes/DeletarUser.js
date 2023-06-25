const express = require('express');
const User = require("../models/user");
const router = express.Router();

// Rota deletar user
router.get('/excluir', async (req, res) => { 
    if (req.session.user) {
        const user = req.session.user;
        // Excluir o usuário do banco de dados
        User.findByIdAndDelete(user._id)
          .then(() => {
            // Remover os dados da sessão
            req.session.destroy((err) => {
              if (err) {
                console.error('Erro ao encerrar a sessão:', err);
                res.status(500).send('Erro ao encerrar a sessão');
              } else {
                const successMessage = 'Conta excluída com sucesso';
                res.send(`<script>alert("${successMessage}"); window.location.href = "/login";</script>`);
              }
            });
          })
          .catch(error => {
            console.error('Erro ao excluir usuário no MongoDB:', error);
            const errorMessage = 'Erro ao excluir conta do usuário';
            res.status(500).send(`<script>alert("${errorMessage}"); window.location.href = "/login";</script>`);
          });
      } else {
        res.redirect('/login');
      }
}); 

module.exports = router;