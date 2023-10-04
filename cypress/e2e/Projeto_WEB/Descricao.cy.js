describe('Página de Descrição', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/descricao')
  })

  it('Deve exibir o título correto', () => {
    cy.get('h1').should('contain', 'DESCRIÇÃO DO PROJETO')
  })

  it('Deve exibir o menu de navegação corretamente', () => {
    cy.get('nav').within(() => {
      cy.contains('Página Inicial')
      cy.contains('Descrição')
      cy.contains('Tecnologias')
      cy.contains('Desenvolvedores')
      cy.contains('Contato')
      cy.contains('Login')
    })
  })

  it('Deve exibir o conteúdo da descrição corretamente', () => {
    cy.get('.container').should('be.visible')
  })

  it('Verifica os links do footer', () => {
    // Verifica se o texto está correto
    cy.contains('Copyright © 2023 Desenvolvido por Alécio L. Medeiros')
    // Verifica se o link do Facebook está correto
    cy.get('footer a[href="https://www.facebook.com/Madenxx/"]').should('have.attr', 'target', '_blank')
    // Verifica se o link do LinkedIn está correto
    cy.get('footer a[href="https://www.linkedin.com/in/madenx"]').should('have.attr', 'target', '_blank')
    // Verifica se o link do GitHub está correto
    cy.get('footer a[href="https://github.com/M4deN"]').should('have.attr', 'target', '_blank')
    // Verifica se o link do Instagram está correto
    cy.get('footer a[href="https://www.instagram.com/madenx/"]').should('have.attr', 'target', '_blank')
    // Verifica se os ícones de rede social estão presentes
    cy.get('footer i.fab.fa-linkedin-in').should('exist')
    cy.get('footer i.fab.fa-github').should('exist')
    cy.get('footer i.fab.fa-instagram').should('exist')
  })
})