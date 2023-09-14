describe('Página de Livros', () => {
  before(() => {
    cy.visit('http://localhost:3000/livros');
    cy.get('#order-author').should('exist');
    cy.get('#search-input').should('exist');
  });

  it('Ordenar livros por autor de forma ascendente', () => {
    cy.get('#order-author').select('A-Z')
  });
  
  it('Buscar livros por título', () => {
    cy.get('#search-input').type('Livro 1');  
    cy.get('#search-button').click();  
    cy.get('#livros-lista li').should('have.length', 6);
    cy.get('#livros-lista li:nth-child(1) p:nth-child(2)').contains('Título:');
  });
  
});  