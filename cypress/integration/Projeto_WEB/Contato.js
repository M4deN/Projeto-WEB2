describe('Página de Contato', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/contato');
    });
  
    it('Deve exibir corretamente o título', () => {
      cy.contains('h4', 'CONTATO');
    });
  
    it('Deve enviar o formulário de contato com sucesso', () => {
      cy.get('input[name="nome"]').type('Alecio L. Medeiros');
      cy.get('input[name="email"]').type('alecio.medeiros@gmail.com');
      cy.get('input[name="assunto"]').type('Assunto de teste');
      cy.get('textarea[name="mensagem"]').type('Mensagem de teste');
      cy.get('button[type="submit"]').click();
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Mensagem enviada com sucesso!');
      });
      cy.url().should('include', '/contato');
    });
});