// Arquivo: cypress/integration/app.spec.js

describe('Página Inicial', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });
  
    it('Deve exibir o título corretamente', () => {
      cy.contains('h1', 'BOOK EXPRESS');
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
  
    it('Deve exibir o formulário de login corretamente', () => {
      cy.get('.login-form').within(() => {
        cy.get('input[name="email"]').should('exist');
        cy.get('input[name="senha"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
      });
    });
  
    it('Deve redirecionar para a página de descrição ao clicar no link', () => {
      cy.contains('Descrição').click();
      cy.url().should('include', '/descricao');
    });
  
    it('Deve redirecionar para a página de tecnologias ao clicar no link', () => {
      cy.contains('Tecnologias').click();
      cy.url().should('include', '/tecnologia');
    });
  
    it('Deve redirecionar para a página de desenvolvedores ao clicar no link', () => {
      cy.contains('Desenvolvedores').click();
      cy.url().should('include', '/desenvolvedor');
    });
  
    it('Deve redirecionar para a página de contato ao clicar no link', () => {
      cy.contains('Contato').click();
      cy.url().should('include', '/contato');
    });
  
    it('Deve redirecionar para a página de login ao clicar no link', () => {
      cy.contains('Login').click();
      cy.url().should('include', '/login');
    });
  });