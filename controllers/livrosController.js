const Livro = require('../models/livro');


// Obtém a lista de todos os livros
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
    res.send(livroCriado);
    console.log('ADICIONOU ESSA PORR****');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao adicionar um novo livro');
  }
};

// Obtém os detalhes de um livro específico
const obterDetalhesLivro = async (req, res) => {
  try {
    const livroId = req.params.id;
    const livro = await Livro.findById(livroId).exec();

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
    const atualizacaoLivro = req.body;
    const livroAtualizado = await Livro.findByIdAndUpdate(livroId, atualizacaoLivro, { new: true }).exec();

    if (!livroAtualizado) {
      return res.status(404).send('Livro não encontrado');
    }

    res.send(livroAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao atualizar as informações do livro');
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

module.exports = {
  obterLivros,
  adicionarLivro,
  obterDetalhesLivro,
  atualizarLivro,
  excluirLivro,
};
