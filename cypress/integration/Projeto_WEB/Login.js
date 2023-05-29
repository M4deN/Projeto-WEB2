// Arquivo: cypress/integration/login.spec.js

describe('Página de Login', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/login');
    });
  
    it('Deve exibir corretamente o título', () => {
      cy.contains('h4', 'LOGIN');
    });
  
    it('Deve redirecionar para a página inicial ao fazer login com credenciais corretas', () => {
      cy.get('input[name="username1"]').type('teste@email.com');
      cy.get('input[name="password2"]').type('1234');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/');
    });
  
    it('Deve exibir uma mensagem de erro ao fazer login com credenciais incorretas', () => {
      cy.get('input[name="username1"]').type('usuario@invalido.com');
      cy.get('input[name="password2"]').type('senhaerrada');
      cy.get('button[type="submit"]').click();
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Credenciais inválidas. Por favor, tente novamente.');
      });
      cy.url().should('include', '/login');
    });
  });