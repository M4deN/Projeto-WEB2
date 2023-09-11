describe('Página de Desenvolvedor', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
      cy.get('.nav-links li:nth-child(4) a').click();
    });
  
    it('Deve exibir o título "DESENVOLVEDOR"', () => {
      cy.timeout(6000)
      cy.get('h1').should('have.text', 'DESENVOLVEDOR');
    });
  
    it('Deve exibir as informações do desenvolvedor corretamente', () => {
      cy.timeout(6000)
      const expectedText = '\n    Alecio Leandro de Medeiros Ocupação: Estudante de Engenharia de Software Empresa: \nRoche La Hoffman Ferramentas: JavaScript, Cypress, Selenium, Robot, Appium, Node, Template EJS, Icones AJAX, CSS.         \n ';
      cy.get('.container').should('contain.text', expectedText);
    });
  
    it('Deve redirecionar para a página de contato ao clicar no link de contato', () => {
      cy.get('a[href="/contato"]').click();
      cy.url().should('include', '/contato');
    });
  });  