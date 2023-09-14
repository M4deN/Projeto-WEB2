describe('Página de Livros', () => {
  before(() => {
    cy.timeout(6000)
    cy.visit('http://localhost:3000/livros');
  });

  it('Ordenar livros por autor de forma ascendente', () => {
    cy.timeout(6000)
    cy.get('#order-author').select('A-Z')
  });
  
  it('Buscar livros por título', () => {
    cy.timeout(6000)
    cy.get('#search-input').type('Livro 1');  
    cy.get('#search-button').click();  
    cy.get('#livros-lista li').should('have.length', 6);
    cy.get('#livros-lista li:nth-child(1) p:nth-child(2)').contains('Título:');
  });
  
});  