describe('Página de Livros', () => {
  before(() => {
    cy.visit('http://localhost:3000');
    cy.get('#email').type('usuario@example.com');
    cy.get('#senha').type('senha123');
    cy.get('button[type="submit"]').click();
    cy.get('.nav-links li:nth-child(7) a').click();
  });

  it('Ordenar livros por autor de forma ascendente', () => {
    cy.get('#order-author').select('asc');
  });
  
  it('Buscar livros por título', () => {
    cy.get('#search-input').type('Livro 1');  
    cy.get('#search-button').click();  
    cy.get('#livros-lista li').should('have.length', 6);
    cy.get('#livros-lista li:nth-child(1) p:nth-child(2)').contains('Título:');
  });
  
});  