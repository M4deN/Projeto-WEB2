document.getElementById('search-button').addEventListener('click', function() {
    var input = document.getElementById('search-input');
    var searchTerm = input.value.trim().toLowerCase();
    var books = document.getElementById('livros-lista').getElementsByTagName('li');
    var found = false;
    for (var i = 0; i < books.length; i++) {
      var book = books[i];
      var title = book.getElementsByTagName('p')[0].textContent.toLowerCase();
      if (title.includes(searchTerm)) {
        book.style.display = 'block';
        found = true;
      } else {
        book.style.display = 'none';
      }
    }
    if (!found) {
      alert('Nenhum livro encontrado com esse título.');
    }
  });
  