const fs = require('fs');
const { enviarEmail } = require('../public/javascripts/email');
const livrosController = require('../controllers/livrosController');
const cadastroRouter = require("../public/javascripts/cadastro");
const loginRouter = require("../public/javascripts/login");
const User = require("../models/user");
const session = require('express-session');
const loadData = require("../models/carga");
const crypto = require('crypto');
const Livro = require("../models/livro");
const path = require('path');
const gerarRelatorio = require("../public/javascripts/gerarPdf");


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

  app.get('/login', (req, res) => {
    res.render('login');
  });

  // Middleware para verificar se o usuário está autenticado
  const verificarAutenticacao = (req, res, next) => {
    // Verificar se há um usuário autenticado na sessão ou no token de autenticação
  
    if (req.session.user) {
      // O usuário está autenticado, continue para a próxima rota
      next();
    } else {
      // O usuário não está autenticado, redirecione para a página de login ou retorne um erro
      res.redirect('/login');
    }
  };

  // Defina a rota de carga
  app.get('/carga', async (req, res) => {
    try {
      await loadData();
      const successMessage = 'Carga automática de dados concluída com sucesso!';
      console.log(successMessage);
      res.send(`<script>alert("${successMessage}"); window.location.href = "/livros";</script>`);
    } catch (error) {
      console.error('Erro ao realizar carga automática de dados:', error);
      const errorMessage = 'Erro ao realizar carga automática de dados';
      res.send(`<script>alert("${errorMessage}"); window.location.href = "/livros";</script>`);
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
      // Nenhum usuário ou admin está logado
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

 // Rota para exibir o formulário de alteração do usuário
app.get('/alterar', async (req, res) => {
  try {
    // Verificar se há um usuário na sessão
    if (req.session.user) {
      const user = req.session.user;
      res.render('alterar', { user });
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.error('Erro ao exibir formulário de alteração do usuário:', error);
    res.status(500).send('Erro ao exibir formulário de alteração do usuário');
  }
});

// Rota para atualizar os dados do usuário
app.post('/alterar/:id', async (req, res) => {
  try {
    // Verificar se há um usuário na sessão
    if (req.session.user) {
      const userId = req.params.id;
      const { email, senha, nome } = req.body;
      const user = req.session.user;

      // Verificar se o ID do usuário na sessão corresponde ao ID fornecido na rota
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
        // Salvar as alterações no banco de dados
        await existingUser.save();
        // Atualizar o usuário na sessão
        req.session.user = existingUser;
        const successMessage = 'Dados atualizados com sucesso';
        res.send(`<script>alert("${successMessage}"); window.location.href = "/";</script>`);
      } else {
        // Usuário não encontrado
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
  
  // Rota para o envio do formulário de contato
  app.post('/contato/enviar', enviarEmail);

  //Deletar Usuario
  app.get('/excluir', (req, res) => {
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
      const usuarioLogado = req.session.user ? true : false;
  
      res.render('livros', { livros, totalPaginas, pagina: parseInt(pagina), usuarioLogado });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao obter a lista de livros');
    }
  });  

  app.get('/pdf', async (req, res) => {
    try {
      const pdfPath = await gerarRelatorio();
      const fileName = 'relatorio.pdf';
  
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${fileName}"`,
      });
  
      res.sendFile(path.resolve(pdfPath));
    } catch (error) {
      const errorMessage = 'Ocorreu um erro ao gerar o relatório em PDF.';
      const errorMessageScript = `<script>alert("${errorMessage}"); window.location.href = "/livros";</script>`;
      console.error('Erro ao gerar o relatório em PDF:', error);
      res.status(500).send(errorMessageScript);
    }
  });
     
  //Adicionar Livros
  app.get('/adicionar', verificarAutenticacao, (req, res) => {
    res.render('adicionar');
  });
  
  app.post('/livros', livrosController.adicionarLivro);

  // GET /livros/{id}: Obter detalhes de um livro específico
  app.get('/livros/:id', livrosController.obterDetalhesLivro);

  // Rota protegida - Apenas usuários autenticados podem acessar
  app.get('/livros/:id', verificarAutenticacao, livrosController.obterDetalhesLivro);

  // Rota protegida - Apenas usuários autenticados podem acessar
  app.get('/livros/:id/editar', verificarAutenticacao, livrosController.exibirFormularioEdicaoLivro);

  // Rota protegida - Apenas usuários autenticados podem acessar
  app.post('/livros/:id', verificarAutenticacao, livrosController.atualizarLivro);

  // Rota protegida - Apenas usuários autenticados podem acessar
  app.delete('/livros/:id', verificarAutenticacao, livrosController.excluirLivro);
};