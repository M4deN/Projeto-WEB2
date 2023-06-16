// Arquivo: cypress/integration/login.spec.js

describe('Página de Login', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/login');
    });
  
    it('Deve exibir corretamente o título', () => {
      cy.contains('h4', 'LOGIN');
    });
  
    it('Deve redirecionar para a página inicial ao fazer login com credenciais corretas', () => {
      cy.get('[type="email"]').type('charlie_brandbury@outlook.com');
      cy.get('[type="password"]').type('123456');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/');
    });
  
    it('Deve exibir uma mensagem de erro ao fazer login com credenciais incorretas', () => {
      cy.get('[type="email"]').type('usuario@invalido.com');
      cy.get('[type="password"]').type('senhaerrada');
      cy.get('button[type="submit"]').click();
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Usuário não encontrado !!');
      });
      cy.url().should('include', '/login');
    });
  });