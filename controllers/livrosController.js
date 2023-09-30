const Joi = require('joi');
const Livro = require('../models/livro');

// Validação do esquema do livro
const livroSchema = Joi.object({
  titulo: Joi.string().required(),
  anoPublicacao: Joi.number().required(),
  autor: Joi.string().required(),
  editora: Joi.string().required()
});

// lista de todos os livros
const obterLivros = async (req, res) => {
  try {
    const livros = await Livro.find().exec();
    res.send(livros);
    console.log('entrou aqui');
  } catch (error) {
    console.log('ou aqui');
    console.error(error);
    res.status(500).send(`<script>alert('Erro ao obter a lista de livros'); window.location.href = "/";</script>`);
  }
};

// Adiciona um novo livro
const adicionarLivro = async (req, res) => {
  try {
    const novoLivro = req.body;

    // Validar os dados do novo livro
    const { error } = livroSchema.validate(novoLivro);
    if (error) {
      const errorMessage = 'Dados inválidos do livro';
      const script = `<script>alert("${errorMessage}"); window.location.href = "/livros/adicionar";</script>`;
      return res.send(script);
    }

    const livroCriado = await Livro.create(novoLivro);

    const successMessage = 'Livro adicionado com sucesso!';
    const script = `<script>alert("${successMessage}"); window.location.href = "/livros";</script>`;
    
    // Utilizar o livroCriado conforme necessário
    console.log('Livro criado:', livroCriado);

    res.send(script);
  } catch (error) {
    const errorMessage = 'Erro ao adicionar um novo livro';
    const script = `<script>alert("${errorMessage}"); window.location.href = "/livros/adicionar";</script>`;
    res.send(script);
  }
};

const obterDetalhesLivro = async (req, res, next) => {
  try {
    const livroId = req.params.id;
    // Verificar se o ID do livro é válido
    if (!livroId) {
      return res.status(400).send('ID de livro inválido');
    }
    //obtenção dos detalhes do livro a partir do banco de dados
    const livro = await Livro.findById(livroId).exec();

    if (!livro) {
      const errorMessage = 'Livro não encontrado';
      const script = `<script>alert("${errorMessage}"); window.location.href = "/livros";</script>`;
      return res.send(script);
    }

    req.livroDetalhes = livro;
    next();
  } catch (error) {
    console.error(error);
    const errorMessage = 'Erro ao obter os detalhes do livro';
    const script = `<script>alert("${errorMessage}"); window.location.href = "/livros";</script>`;
    res.send(script);
  }
};

// Atualiza as informações de um livro específico
const atualizarLivro = async (req, res) => {
  try {
    const livroId = req.params.id;
    const livroAtualizado = req.body;

    // Validar os dados do livro atualizado
    const { error } = livroSchema.validate(livroAtualizado); // Correção aqui
    if (error) {
      const errorMessage = 'Dados inválidos do livro';
      const script = `<script>alert("${errorMessage}"); window.location.href = "/livros";</script>`;
      return res.send(script);
    }

    const livro = await Livro.findByIdAndUpdate(livroId, livroAtualizado, { new: true }).exec();

    if (!livro) {
      const errorMessage = 'Livro não encontrado';
      const script = `<script>alert("${errorMessage}"); window.location.href = "/livros";</script>`;
      return res.send(script);
    }

    const successMessage = 'Livro atualizado com sucesso!';
    const script = `<script>alert("${successMessage}"); window.location.href = "/livros";</script>`;
    res.send(script);
    console.log('Livro Atualizado:', livroAtualizado);
  } catch (error) {
    console.error(error);
    const errorMessage = 'Erro ao atualizar o livro';
    const script = `<script>alert("${errorMessage}"); window.location.href = "/livros";</script>`;
    res.send(script);
  }
};

// Exclui um livro específico
const excluirLivro = async (req, res) => {
  try {
    const livroId = req.params.id;
    const livroExcluido = await Livro.findByIdAndDelete(livroId).exec();

    if (!livroExcluido) {
      const errorMessage = 'Livro não encontrado';
      const script = `<script>alert("${errorMessage}"); window.location.href = "/livros";</script>`;
      return res.send(script);
    }
    res.send(livroExcluido);
    console.log('Livro Excluido:', livroExcluido);
  } catch (error) {
    console.error(error);
    const errorMessage = 'Erro ao excluir o livro';
    const script = `<script>alert("${errorMessage}"); window.location.href = "/livros";</script>`;
    res.send(script);
  }
};

const exibirFormularioEdicaoLivro = async (req, res) => {
  try {
    const livroId = req.params.id;
    const livro = await Livro.findById(livroId).exec();

    if (!livro) {
      const errorMessage = 'Livro não encontrado';
      const script = `<script>alert("${errorMessage}"); window.location.href = "/livros";</script>`;
      return res.send(script);
    }

    res.render('editar', { livro });
  } catch (error) {
    console.error(error);
    const errorMessage = 'Erro ao exibir o formulário de edição do livro';
    const script = `<script>alert("${errorMessage}"); window.location.href = "/livros";</script>`;
    res.send(script);
  }
};

module.exports = {
  obterLivros,
  adicionarLivro,
  obterDetalhesLivro,
  atualizarLivro,
  excluirLivro,
  exibirFormularioEdicaoLivro,
};