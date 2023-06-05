const Livro = require("../models/livro");


const loadData = async () => {
  try {
    const livros = [
      {
        titulo: 'Dom Quixote',
        anoPublicacao: 1605,
        autor: 'Miguel de Cervantes',
        editora: 'Editora 1'
      },
      {
        titulo: 'Guerra e Paz',
        anoPublicacao: 1869,
        autor: 'Liev Tolstói',
        editora: 'Editora 2'
      },
      {
        titulo: 'A Montanha Mágica',
        anoPublicacao: 1924,
        autor: 'Thomas Mann',
        editora: 'Editora 3'
      },
      {
        titulo: 'Cem Anos de Solidão',
        anoPublicacao: 1967,
        autor: 'Gabriel García Márquez',
        editora: 'Editora 4'
      },
      {
        titulo: 'Em Busca do Tempo Perdido',
        anoPublicacao: 1913,
        autor: 'Marcel Proust',
        editora: 'Editora 5'
      },
      
    ];

    await Livro.insertMany(livros);
    console.log('Carga automática de dados concluída com sucesso!');
  } catch (error) {
    console.error('Erro ao realizar carga automática de dados:', error);
  }
};

module.exports = loadData;

