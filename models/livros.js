const Livro = require("../models/livro");

function obterLivros() {
  fetch('/livros')
    .then(response => response.json())
    .then(livros => exibirLivros(livros))
    .catch(error => console.error(error));
}

function exibirLivros(livros) {
  const listaLivros = document.getElementById('livros-lista');

  livros.forEach(livro => {
    const itemLista = document.createElement('li');

    const livroImagem = document.createElement('img');
    livroImagem.src = "../public/images/book.png";
    itemLista.appendChild(livroImagem);

    const livroDetalhes = document.createElement('p');
    livroDetalhes.textContent = `Título: ${livro.titulo}, Autor: ${livro.autor}, Ano de Publicação: ${livro.anoPublicacao}, Editora: ${livro.editora}`;
    itemLista.appendChild(livroDetalhes);

    const editarBotao = document.createElement('button');
    editarBotao.textContent = "Editar";
    editarBotao.addEventListener('click', () => editarLivro(livro._id));
    itemLista.appendChild(editarBotao);

    const excluirBotao = document.createElement('button');
    excluirBotao.textContent = "Excluir";
    excluirBotao.addEventListener('click', () => excluirLivro(livro._id));
    itemLista.appendChild(excluirBotao);

    listaLivros.appendChild(itemLista);
  });
}

function editarLivro(livroId) {
  fetch(`/livros/${livroId}/editar`, {
    method: 'PUT',
    body: JSON.stringify({ 
      titulo: 'Novo Título',
      autor: 'Novo Autor',
      anoPublicacao: 2023,
      editora: 'Nova Editora'
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      
    })
    .catch(error => {
      console.error(error);
    
    });
}

function excluirLivro(livroId) {
  fetch(`/livros/${livroId}/excluir`, {
    method: 'DELETE',
    
  })
    .then(response => {
      
    })
    .catch(error => {
      console.error(error);
      
    });
}

window.onload = obterLivros;
