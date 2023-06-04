const express = require('express');
const router = express.Router();
const fs = require('fs');
const { enviarEmail } = require('../public/javascripts/email');
const livrosController = require('../controllers/livrosController');
const cadastroRouter = require("../public/javascripts/cadastro");
const User = require("../public/javascripts/user");
const session = require('express-session');
const alterRouter = require('../public/javascripts/alterar');
const crypto = require('crypto');


module.exports = (app) => {
  
  const generateRandomKey = () => {
    return crypto.randomBytes(32).toString('hex');
  };
  
  const chaveSecreta = generateRandomKey();
  console.log("chave gerada: ",chaveSecreta);

// Rota da página login
  app.get('/login', (req, res) => {
    res.render('login');
  });

// Configuracao uso de sessão
app.use(session({
  secret: chaveSecreta,
  resave: false,
  saveUninitialized: true,
}));

// Rota de login
app.post('/login', async (req, res) => {
  const { senha, email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      if (senha === user.senha) {
        // Definicao dados na sessão
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
    res.status(500).send('Erro ao realizar o login');
  }
});
//Rota Teste Usuário Logado
app.get('/teste-sessao', (req, res) => {
  // Verificar se há um usuário na sessão
  if (req.session.user) {
    // Recuperar os dados do usuário da sessão
    const user = req.session.user;
    const mensagem = `Usuário logado: ${user.nome}`;
    res.send(`<script>alert("${mensagem}"); window.location.href = "/";</script>`);
  } else {
    const mensagem = 'Nenhum usuário logado';
    res.send(`<script>alert("${mensagem}"); window.location.href = "/login";</script>`);
  }
});

// Rota para deslogar o usuário
app.get('/logout', (req, res) => {
  // Limpar os dados da sessão
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao encerrar a sessão:', err);
      res.status(500).send('Erro ao encerrar a sessão');
    } else {
      res.redirect('/login'); // Redirecionar para a página de login
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
      const user = req.session.user; // Definir a variável 'user' com os dados do usuário
      next(); // Passar para a próxima função de middleware
    } else {
      // Usuário não está logado, redirecionar para a página de login
      res.redirect('/login');
    }
  }, (req, res) => {
    // Lógica para atualizar o usuário usando a variável 'user'
    res.send('Usuário atualizado com sucesso!');
  });
  

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
    res.redirect('/login'); // Redirecionar para a página de login se o usuário não estiver logado
  }
});


  // Rota para o envio do formulário de contato
  app.post('/contato/enviar', enviarEmail);

  // Rotas da API REST

  // GET /livros: Obter a lista de todos os livros
  app.get('/livros', livrosController.obterLivros);

  // POST /livros: Adicionar um novo livro
  app.post('/livros', livrosController.adicionarLivro);

  // GET /livros/{id}: Obter detalhes de um livro específico
  app.get('/livros/:id', livrosController.obterDetalhesLivro);

  // PUT /livros/{id}: Atualizar as informações de um livro específico
  app.put('/livros/:id', livrosController.atualizarLivro);

  // DELETE /livros/{id}: Excluir um livro específico
  app.delete('/livros/:id', livrosController.excluirLivro);
};

