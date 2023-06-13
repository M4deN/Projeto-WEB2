describe('Página de Desenvolvedor', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/desenvolvedor');
    });
  
    it('Deve exibir o título "DESENVOLVEDOR"', () => {
      cy.get('h1').should('contain.text', 'DESENVOLVEDOR');
    });
  
    it('Deve exibir as informações do desenvolvedor corretamente', () => {
      const expectedText = '\n    Alecio Leandro de Medeiros Ocupação: Estudante de Engenharia de Software Empresa: \nRoche La Hoffman Ferramentas: JavaScript, Cypress, Selenium, Robot, Appium, Node, Template EJS, Icones AJAX, CSS.         \n ';
      cy.get('.container').should('contain.text', expectedText);
    });
  
    it('Deve redirecionar para a página de contato ao clicar no link de contato', () => {
      cy.get('a[href="/contato"]').click();
      cy.url().should('include', '/contato');
    });
  });  