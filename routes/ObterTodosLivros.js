const express = require('express');
const Livro = require("../models/livro");
const router = express.Router();

// Rota de Obter todos os livros Ordenado
router.get('/livros', async (req, res) => { 
        try {
          const pagina = req.query.pagina || 1; 
          const registrosPorPagina = 6; 
          const orderAuthor = req.query.orderAuthor || ''; 
          const orderYear = req.query.orderYear || ''; 
          
          let query = Livro.find()
            .skip((pagina - 1) * registrosPorPagina)
            .limit(registrosPorPagina);
            
          if (orderAuthor) {
            const sortOrder = orderAuthor === 'asc' ? 1 : -1;
            query = query.sort({ autor: sortOrder });
          }
          
          if (orderYear) {
            const sortOrder = orderYear === 'asc' ? 1 : -1;
            query = query.sort({ anoPublicacao: sortOrder });
          }
      
          const totalRegistros = await Livro.countDocuments(); 
          const totalPaginas = Math.ceil(totalRegistros / registrosPorPagina);   
          const livros = await query.exec();
      
          // Verificar se há um usuário na sessão
          let nomeUsuario = '';
            if (req.session.user) {
              // Usuário está logado
              nomeUsuario = req.session.user.nome;
          }
            res.render('livros', { livros, totalPaginas, pagina: parseInt(pagina), user: req.session.user, nomeUsuario });
          } catch (error) {
          const errorMessage = 'Erro ao obter a lista de livros';
            res.send(`<script>alert("${errorMessage}"); window.location.href = "/";</script>`);
          }
    }); 

module.exports = router;