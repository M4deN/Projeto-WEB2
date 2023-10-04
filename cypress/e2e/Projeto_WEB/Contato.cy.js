describe('Página de Contato', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/contato')
  })

  it('Deve exibir corretamente o título', () => {
    cy.contains('h4', 'CONTATO')
  })

  it.only('Deve enviar o formulário de contato com sucesso', () => {
    cy.get('input[name="nome"]').type('Alecio L. Medeiros')
    cy.get('input[name="email"]').type('alexdesaran@outlook.com')
    cy.get('input[name="assunto"]').type('Teste Em Cypress')
    cy.get('textarea[name="mensagem"]').type('Teste em cypress foi executado com sucesso!')
    cy.get('button[type="submit"]').click()
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Mensagem enviada com sucesso!')
    })
    cy.url().should('include', '/contato')
  })
})