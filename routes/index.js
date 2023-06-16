const fs = require('fs');
const { enviarEmail } = require('../public/javascripts/email');
const livrosController = require('../controllers/livrosController');
const cadastroRouter = require("../public/javascripts/cadastro");
const loginRouter = require("../public/javascripts/login");
const User = require("../models/user");
const session = require('express-session');
const loadData = require("../models/carga");
const livrosRouter = require("../public/javascripts/ObterTodosLivros");
const path = require('path');
const gerarRelatorio = require("../public/javascripts/gerarPdf");
const UserRouter = require("../public/javascripts/DeletarUser");
const alterRouter = require("../public/javascripts/AlterarUser");
const chaveSecreta ='$has123456#';

module.exports = (app) => {
 
  app.use(session({
    secret: chaveSecreta,
    resave: false,
    saveUninitialized: true,
  }));
  
// Rota da página login
app.use('/login', loginRouter);

// Rota da página login
app.get('/login', (req, res) => {
  res.render('login');
});

 // Middleware para verificar se o usuário está autenticado
 const verificarAutenticacao = (req, res, next) => {
  // Verificar se há um usuário autenticado na sessão ou no token de autenticação
  if (req.session.user || req.headers.authorization) {
    // O usuário está autenticado, continue para a próxima rota
    next();
  } else {
    // Usuário não autenticado, retorne um erro redirecione para a página de login
    res.status(401).send('<script>alert("Usuário não autenticado."); window.location.href = "/";</script>');
  }
};

app.get('/token', verificarAutenticacao, (req, res) => {
  // usuário autenticado
  const usuario = req.session.user;
  // Verifica se o usuário está autenticado
  if (usuario) {
    // Recupera o token da sessão
    const tokenGerado = req.session.token;
    console.log('Token Recuperado:', tokenGerado);
    const alertScript = `<script>alert("Token recuperado: ${tokenGerado}"); window.location.href = "/";</script>`;
    res.send(alertScript);
  } else {
    // Usuário não autenticado, retorne um erro redirecione para a página de login
    res.status(401).send('<script>alert("Usuário não autenticado."); window.location.href = "/";</script>');
  }
});
   
  // Rota de carga
  app.get('/carga', async (req, res) => {
    try {
      await loadData();
      const successMessage = 'Carga automática de dados concluída com sucesso!';
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
        const mensagem = 'Erro ao encerrar a sessão';
        res.send(`<script>alert("${mensagem}"); window.location.href = "/login";</script>`);
      } else {
        // Limpar o token armazenado no header de autenticação
        delete req.headers.authorization;
        // Redirecionar o usuário para a página de login
        res.redirect('/login');
      }
    });
  });
  
  //Middleware para realizar o login na página index
  app.use('/', loginRouter);
  // Rota da página inicial
  app.get('/', (req, res) => {
    let nomeUsuario = '';    
    if (req.session.token) {
      // Usuário está logado
      const tokenGerado = req.session.token;
      // Exibe o token recuperado no console
      nomeUsuario = req.session.user.nome;  
     
    }    
    const tecnologia = fs.readFileSync('./conteudo/index.txt', 'utf8');
    res.render('index', { conteudo: tecnologia, user: req.session.user, nomeUsuario });
  });
  
  // Rota da página de descrição 
  app.get('/descricao', (req, res) => {
    let nomeUsuario = '';    
    if (req.session.user) {
      // Usuário está logado
      nomeUsuario = req.session.user.nome;
    }  
    const tecnologia = fs.readFileSync('./conteudo/descricao.txt', 'utf8');
    res.render('descricao', { conteudo: tecnologia, user: req.session.user, nomeUsuario  });
  });

  // Rota da página de tecnologias 
  app.get('/tecnologia', (req, res) => {
    let nomeUsuario = '';    
    if (req.session.user) {
      // Usuário está logado
      nomeUsuario = req.session.user.nome;
    }  
    const tecnologia = fs.readFileSync('./conteudo/tecnologia.txt', 'utf8');
    res.render('tecnologia', { conteudo: tecnologia, user: req.session.user, nomeUsuario });
  });

  // Rota da página de desenvolvedor
  app.get('/desenvolvedor', (req, res) => {
    let nomeUsuario = '';    
    if (req.session.user) {
      // Usuário está logado
      nomeUsuario = req.session.user.nome;
    }  
    const desenvolvedor = fs.readFileSync('./conteudo/desenvolvedor.txt', 'utf8');
    res.render('Desenvolvedor', { conteudo: desenvolvedor, user: req.session.user, nomeUsuario });
  });

  app.use('/cadastro', cadastroRouter);
  // Rota da página de cadastro
  app.get('/cadastro', (req, res) => {
    res.render('cadastro');
  });

  // Rota da página de contato
  app.get('/contato', (req, res) => {
    let nomeUsuario = '';    
    if (req.session.user) {
      // Usuário está logado
      nomeUsuario = req.session.user.nome;
    }  
    res.render('contato', { user: req.session.user, nomeUsuario });
  });

 // Rota para formulário de alteração do usuário
app.get('/alterar',verificarAutenticacao, async (req, res) => {
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
app.post('/alterar/:id', verificarAutenticacao,alterRouter );
  
  
  // Rota para o envio do formulário de contato
  app.post('/contato/enviar', enviarEmail);

  //Deletar Usuario
  app.get('/excluir', UserRouter);//Mexi NESSE AGORA
  
  // Rotas da API REST
  // GET /livros: Obter a lista de todos os livros 
  app.get('/livros', livrosRouter);//Mexi NESSE AGORA

    //Rota para a pagina PDF
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
     
  // Rota Adiconar protegida - Apenas usuários autenticados podem acessar
  app.get('/adicionar', verificarAutenticacao, (req, res) => {
    res.render('adicionar');
  });

  // Rota post protegida - Apenas usuários autenticados podem acessar
  app.post('/livros', livrosController.adicionarLivro, verificarAutenticacao);

  // Rota Exibir Detalhes protegida - Apenas usuários autenticados podem acessar
  app.get('/livros/:id', verificarAutenticacao, livrosController.obterDetalhesLivro,  (req, res) =>{
    const livroDetalhes = req.livroDetalhes;
  res.render('detalhes', { livro: livroDetalhes });
  });

  // Rota ExibirFormEdit protegida - Apenas usuários autenticados podem acessar
  app.get('/livros/:id/editar', verificarAutenticacao, livrosController.exibirFormularioEdicaoLivro);

  // Rota Editar protegida - Apenas usuários autenticados podem acessar
  app.post('/livros/:id', verificarAutenticacao, livrosController.atualizarLivro);

  // Rota Excluir protegida - Apenas usuários autenticados podem acessar
  app.delete('/livros/:id', verificarAutenticacao, livrosController.excluirLivro);
};