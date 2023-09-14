describe('Página de Desenvolvedor', () => {
    beforeEach(() => {
      cy.timeout(6000)
      cy.visit('http://localhost:3000/desenvolvedor');
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

  });  