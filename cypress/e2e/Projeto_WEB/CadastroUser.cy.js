describe('Cadastro de Usuário', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/cadastro')
  })

  it('Cadastrar usuário com sucesso', () => {
    cy.get('input[name="nome"]').type('Nome do Usuário')
    cy.get('input[name="email"]').type('usuarioss@example.com')
    cy.get('input[name="senha"]').type('senha123')
    cy.get('button[type="submit"]').click()
  })

  it('Mostrar erro ao cadastrar com e-mail inválido', () => {
    cy.get('input[name="nome"]').type('Nome do Usuário')
    cy.get('input[name="email"]').type('email.invalido@')
    cy.get('input[name="senha"]').type('senha123')
    cy.get('button[type="submit"]').click()

  })

  it('Mostrar erro ao cadastrar com senha curta', () => {
    cy.get('input[name="nome"]').type('Nome do Usuário')
    cy.get('input[name="email"]').type('usuarios@example.com')
    cy.get('input[name="senha"]').type('123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/cadastro')
  })

  it('Mostrar erro ao cadastrar com e-mail já cadastrado', () => {
    // Cadastrar um usuário com e-mail já existente no banco de dados
    cy.request('POST', '/cadastro', {
      nome: 'Usuário Existente',
      email: 'usuario@example.com',
      senha: 'senha123',
    })
    cy.on('window:alert', (message) => {
      expect(message).to.equal('O e-mail fornecido já está cadastrado')
    })
  })

  it('Mostrar erro genérico ao cadastrar com erro no servidor', () => {
    // Simular erro no servidor enviando uma resposta com status 500
    cy.intercept('POST', '/cadastro', {
      statusCode: 500,
    })

    cy.get('input[name="nome"]').type('Nome do Usuário')
    cy.get('input[name="email"]').type('usuario@example.com')
    cy.get('input[name="senha"]').type('senha123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/cadastro')
  })
})
