const Livro = require('../models/livro');
const mongoose = require('mongoose');

// lista de todos os livros
const obterLivros = async (req, res) => {
  try {
    const livros = await Livro.find().exec();
    res.send(livros);
    console.log('entrou aqui');
  } catch (error) {
    console.log('ou aqui');
    console.error(error);
    res.status(500).send('Erro ao obter a lista de livros');
  }
};

// Adiciona um novo livro
const adicionarLivro = async (req, res) => {
  try {
    const novoLivro = req.body;
    const livroCriado = await Livro.create(novoLivro);

    const successMessage = 'Livro adicionado com sucesso!';
    const script = `<script>alert("${successMessage}"); window.location.href = "/livros";</script>`;
    res.send(script);
  } catch (error) {
    const errorMessage = 'Erro ao adicionar um novo livro';
    const script = `<script>alert("${errorMessage}"); window.location.href = "/livros/adicionar";</script>`;
    res.send(script);
  }
};

// detalhes de um livro específico
const obterDetalhesLivro = async (req, res) => {
  try {
    const livroId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(livroId)) {
      return res.status(400).send('ID de livro inválido');
    }

    const livro = await Livro.findById(livroId).exec();
    console.log('entrou aqui');
    if (!livro) {
      return res.status(404).send('Livro não encontrado');
    }

    res.send(livro);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao obter os detalhes do livro');
  }
};

// Atualiza as informações de um livro específico
const atualizarLivro = async (req, res) => {
  try {
    const livroId = req.params.id;
    const livroAtualizado = req.body;

    const livro = await Livro.findByIdAndUpdate(livroId, livroAtualizado, { new: true }).exec();

    if (!livro) {
      const errorMessage = 'Livro não encontrado';
      const script = `<script>alert("${errorMessage}"); window.location.href = "/livros";</script>`;
      return res.send(script);
    }

    const successMessage = 'Livro atualizado com sucesso!';
    const script = `<script>alert("${successMessage}"); window.location.href = "/livros";</script>`;
    res.send(script);
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
      return res.status(404).send('Livro não encontrado');
    }

    res.send(livroExcluido);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao excluir o livro');
  }
};

const exibirFormularioEdicaoLivro = async (req, res) => {
  try {
    const livroId = req.params.id;
    const livro = await Livro.findById(livroId).exec();

    if (!livro) {
      return res.status(404).send('Livro não encontrado');
    }

    res.render('editar', { livro });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao exibir o formulário de edição do livro');
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
