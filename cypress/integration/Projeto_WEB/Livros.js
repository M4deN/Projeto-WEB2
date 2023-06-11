describe('Página de Livros', () => {
  before(() => {
    cy.visit('http://localhost:3000/livros');
  });

  it('Ordenar livros por autor de forma ascendente', () => {
    cy.get('#order-author').select('asc');
  
    cy.get('#livros-lista li:nth-child(1) p:nth-child(2)').should('have.text', 'Título: Dom Quixote');
  });
  
  it('Ordenar livros por ano de forma descendente', () => {
    cy.get('#order-year').select('desc');
  
    cy.get('#livros-lista li:nth-child(1) p:nth-child(4)').should('have.text', 'Ano de Publicação: 1967');
  });
  

  it('Buscar livros por título', () => {
    cy.get('#search-input').type('Livro 1');
  
    cy.get('#search-button').click();
  
    cy.get('#livros-lista li').should('have.length', 6);
    cy.get('#livros-lista li:nth-child(1) p:nth-child(2)').should('have.text', 'Título: Cem Anos de Solidão');
  });
  
});

  