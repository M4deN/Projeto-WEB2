function excluirLivro(livroId) {
  if (confirm('Tem certeza que deseja excluir este livro?')) {
    fetch(`/livros/${livroId}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        alert('Livro excluído com sucesso!');
        window.location.reload();
      })
      .catch(error => {
        console.error('Erro ao excluir o livro:', error);
        alert('Erro ao excluir o livro. Por favor, tente novamente mais tarde.');
      });
  }
}

function editarLivro(livroId) {
  window.location.href = `/livros/${livroId}/editar`;
}

const excluirButtons = document.querySelectorAll('.excluir-button');
excluirButtons.forEach(button => {
  const livroId = button.dataset.livroId;
  button.addEventListener('click', () => excluirLivro(livroId));
});

const editarButtons = document.querySelectorAll('.editar-button');
editarButtons.forEach(button => {
  const livroId = button.dataset.livroId;
  button.addEventListener('click', () => editarLivro(livroId));
});
