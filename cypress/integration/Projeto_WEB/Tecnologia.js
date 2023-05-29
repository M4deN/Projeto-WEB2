describe('Página de Tecnologias', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/tecnologia');
    });
  
    it('Deve exibir o título "TECNOLOGIAS UTILIZADAS"', () => {
      cy.get('h1').should('contain.text', 'TECNOLOGIAS UTILIZADAS');
    });

    it('Deve exibir o conteúdo da tecnologia corretamente', () => {
      cy.get('.container').should('be.visible');
    });
  
    it('Deve redirecionar para a página de contato ao clicar no link de contato', () => {
      cy.get('a[href="/contato"]').click();
      cy.url().should('include', '/contato');
    });
  });
  