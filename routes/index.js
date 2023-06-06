const fs = require('fs');
const { enviarEmail } = require('../public/javascripts/email');
const livrosController = require('../controllers/livrosController');
const cadastroRouter = require("../public/javascripts/cadastro");
const loginRouter = require("../public/javascripts/login");
const User = require("../public/javascripts/user");
const session = require('express-session');
const loadData = require("../models/carga");
const crypto = require('crypto');
const Livro = require("../models/livro");

module.exports = (app) => {

  
  const generateRandomKey = () => {
    return crypto.randomBytes(32).toString('hex');
  };

  const chaveSecreta = generateRandomKey();
  console.log("chave gerada: ", chaveSecreta);

  // Configuracao uso de sessão
  app.use(session({
    secret: chaveSecreta,
    resave: false,
    saveUninitialized: true,
  }));

  // Rota da página login
  app.use('/login', loginRouter);

  // Rota da página de login
  app.get('/login', (req, res) => {
    res.render('login');
  });

  // Defina a rota de carga
  app.get('/carga', async (req, res) => {
    try {
      await loadData();
      const successMessage = 'Carga automática de dados concluída com sucesso!';
      console.log(successMessage);
      res.send(`<script>alert("${successMessage}"); window.location.href = "/";</script>`);
    } catch (error) {
      console.error('Erro ao realizar carga automática de dados:', error);
      const errorMessage = 'Erro ao realizar carga automática de dados';
      res.send(`<script>alert("${errorMessage}"); window.location.href = "/";</script>`);
    }
  });

  // Rota para verificar se o usuário está logado
  app.get('/verificar-login', (req, res) => {
    if (req.session.user) {
      // Usuário está logado
      const nomeUsuario = req.session.user.nome;
      const mensagem = `Bem-vindo, ${nomeUsuario}!`;
      res.send(`<script>alert("${mensagem}"); window.location.href = "/";</script>`);
    } else {
      // Usuário não está logado
      const mensagem = 'Você precisa fazer login';
      res.send(`<script>alert("${mensagem}"); window.location.href = "/login";</script>`);
    }
  });

  //Rota para deslogar o usuário
  app.get('/logout', (req, res) => {
    // Limpar os dados da sessão
    req.session.destroy((err) => {
      if (err) {
        console.error('Erro ao encerrar a sessão:', err);
        res.status(500).send('Erro ao encerrar a sessão');
      } else {
        res.redirect('/login');
      }
    });
  });

  // Rota da página inicial
  app.get('/', (req, res) => {
    const tecnologia = fs.readFileSync('./conteudo/index.txt', 'utf8');
    res.render('index', { conteudo: tecnologia, user: req.session.user });
  });

  // Rota da página de descrição do projeto
  app.get('/descricao', (req, res) => {
    const tecnologia = fs.readFileSync('./conteudo/descricao.txt', 'utf8');
    res.render('descricao', { conteudo: tecnologia });
  });

  // Rota da página de tecnologias utilizadas
  app.get('/tecnologia', (req, res) => {
    const tecnologia = fs.readFileSync('./conteudo/tecnologia.txt', 'utf8');
    res.render('tecnologia', { conteudo: tecnologia });
  });

  // Rota da página de desenvolvedores
  app.get('/desenvolvedor', (req, res) => {
    const desenvolvedor = fs.readFileSync('./conteudo/desenvolvedor.txt', 'utf8');
    res.render('Desenvolvedor', { conteudo: desenvolvedor });
  });

  app.use('/cadastro', cadastroRouter);
  // Rota da página de cadastro
  app.get('/cadastro', (req, res) => {
    res.render('cadastro');
  });

  // Rota da página de contato
  app.get('/contato', (req, res) => {
    res.render('contato');
  });

  app.get('/alterar', (req, res) => {
    res.render('alterar');
  });

  app.post('/alterar', (req, res, next) => {
    // Verificar se há um usuário na sessão
    if (req.session.user) {
      const user = req.session.user;
      next(); // Passar para a próxima função de middleware
    } else {
      res.redirect('/login');
    }
  }, (req, res) => {
    res.send('Usuário atualizado com sucesso!');
  });

  // Rota para o envio do formulário de contato
  app.post('/contato/enviar', enviarEmail);

  //Deletar Usuario
  app.get('/excluir', (req, res) => {
    // Verificar se há um usuário na sessão
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
          res.status(500).send(`<script>alert("${errorMessage}"); window.location.href = "/perfil";</script>`);
        });
    } else {
      res.redirect('/login');
    }
  });

  // Rotas da API REST
  // GET /livros: Obter a lista de todos os livros
  app.get('/livros', async (req, res) => {
    try {
      const pagina = req.query.pagina || 1; // Obtém o número da página da consulta ou usa o valor padrão como 1
      const registrosPorPagina = 6; // Define o número de registros por página
      const orderAuthor = req.query.orderAuthor || ''; // Obtém o valor de ordenação por autor da consulta ou usa uma string vazia como padrão
      const orderYear = req.query.orderYear || ''; // Obtém o valor de ordenação por ano da consulta ou usa uma string vazia como padrão
      
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
  
      const totalRegistros = await Livro.countDocuments(); // Obtém o número total de registros
      const totalPaginas = Math.ceil(totalRegistros / registrosPorPagina); // Calcula o número total de páginas
  
      const livros = await query.exec();
  
      res.render('livros', { livros, totalPaginas, pagina: parseInt(pagina) });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao obter a lista de livros');
    }
  });
   
  //Adicionar Livros
  app.get('/adicionar', (req, res) => {
    res.render('adicionar');
  });
  app.post('/livros', livrosController.adicionarLivro);

  // GET /livros/{id}: Obter detalhes de um livro específico
  app.get('/livros/:id', livrosController.obterDetalhesLivro);

  /// GET: Exibir formulário de edição de livro
  app.get('/livros/:id/editar', livrosController.exibirFormularioEdicaoLivro);

  // POST: Atualizar livro
  app.post('/livros/:id', livrosController.atualizarLivro);


  // DELETE /livros/{id}: Excluir um livro específico
  app.delete('/livros/:id', livrosController.excluirLivro);
};

