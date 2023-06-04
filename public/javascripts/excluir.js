const express = require('express');
const User = require("../javascripts/user");

const router = express.Router();

router.post('/excluir', (req, res) => {
  // Verificar se há um usuário na sessão
  if (req.session.user) {
    const userId = req.session.user._id;

    // Excluir a conta do usuário no banco de dados
    User.findByIdAndRemove(userId)
      .then(() => {
        // Remoção bem-sucedida
        req.session.destroy((err) => {
          if (err) {
            console.error('Erro ao encerrar a sessão:', err);
            res.status(500).send('Erro ao encerrar a sessão');
          } else {
            res.redirect('/login'); // Redirecionar para a página de login após a exclusão da conta
          }
        });
      })
      .catch(error => {
        console.error('Erro ao excluir usuário no MongoDB:', error);
        res.status(500).send('Erro ao excluir usuário');
      });
  } else {
    res.redirect('/login'); // Redirecionar para a página de login se o usuário não estiver logado
  }
});

module.exports = router;