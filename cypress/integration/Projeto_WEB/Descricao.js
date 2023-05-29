describe('Página de Descrição', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/descricao');
    });
  
    it('Deve exibir o título correto', () => {
      cy.get('h1').should('contain', 'DESCRIÇÃO DO PROJETO');
    });
  
    it('Deve exibir o menu de navegação corretamente', () => {
        cy.get('nav').within(() => {
          cy.contains('Página Inicial');
          cy.contains('Descrição');
          cy.contains('Tecnologias');
          cy.contains('Desenvolvedores');
          cy.contains('Contato');
          cy.contains('Login');
        });
      });
  
    it('Deve exibir o conteúdo da descrição corretamente', () => {
        cy.get('.container').should('be.visible');
    });
  
    it('Deve exibir o rodapé corretamente', () => {
      cy.get('footer').should('contain', '© 2023 Projeto Web Ciclo 1. Todos os direitos reservados.');
    });
  });