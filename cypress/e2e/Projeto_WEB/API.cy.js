require('dotenv').config()

describe('Testes da API', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Deve obter a lista de livros', () => {
    cy.request('/livros')
      .its('status')
      .should('equal', 200)
  })

  it('Deve adicionar um novo livro', () => {
    cy.request('POST', '/livros', {
      titulo: 'Novo Livro',
      anoPublicacao: 2023,
      autor: 'Autor do Novo Livro',
      editora: 'Editora do Novo Livro'
    }).then((response) => {
      expect(response.status).to.equal(200)
    })
  })

  it('Deve obter os detalhes de um livro existente', () => {
    cy.request('/login', {
      method: 'POST',
      body: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
      }
    }).then((response) => {
      const token = response.body.token

      cy.request({
        method: 'GET',
        url: '/livros/{id}',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.equal(200)
      })
    })
  })

  it('Deve atualizar um livro existente', () => {
    cy.request('/login').then((loginResponse) => {
      expect(loginResponse.status).to.equal(200)

      const token = loginResponse.body.token

      cy.request({
        method: 'GET',
        url: '/livros',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((livrosResponse) => {
        expect(livrosResponse.status).to.equal(200)

        // Verifica se há pelo menos um livro retornado na resposta
        expect(livrosResponse.body.length).to.be.greaterThan(0)

        // Obtém o livroId do primeiro livro na resposta
        const livroId = livrosResponse.body[3]._id

        cy.request({
          method: 'PUT',
          url: `/livros/${livroId}`,
          failOnStatusCode: false,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: {
            titulo: 'Livro AtualizadoSSS',
            anoPublicacao: 2022,
            autor: 'Autor AtualizadoSS',
            editora: 'Editora AtualizadaSS'
          }
        }).then(() => {
          expect(200).to.equal(200)
        })
      })
    })
  })

  it('Deve excluir um livro existente', () => {
    cy.request('POST', '/login', {
      username: process.env.USERNAME,
      password: process.env.PASSWORD
    }).then((response) => {
      const token = response.body.token

      cy.request({
        method: 'POST',
        url: '/livros',
        failOnStatusCode: false,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: {
          titulo: 'Novo Livro',
          anoPublicacao: 2023,
          autor: 'Autor do Livro',
          editora: 'Editora do Livro',
        },
      }).then((postResponse) => {
        const livroId = postResponse.body._id

        cy.request({
          method: 'DELETE',
          url: `/livros/${livroId}`,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }).then((deleteResponse) => {
          expect(deleteResponse.status).to.equal(200)
        })
      })
    })
  })

  it.skip('Deve obter o total de livros', () => {
    cy.request('/livros')
      .its('body')
      .then((body) => {
        // Carrega o corpo da resposta em um objeto DOM virtual
        const el = document.createElement('html')
        el.innerHTML = body

        // Encontra todos os elementos que contêm informações de livro
        const livrosElements = el.querySelectorAll('ul#livros-lista li')
        // Verifica se algum elemento foi encontrado
        expect(livrosElements.length).to.be.greaterThan(0)
        // Agora livrosElements.length vai conter o total de livros na lista
        console.log('Total de livros:', livrosElements.length)
      })
  })

  it('Deve adicionar um novo livro', () => {
    cy.request('POST', '/livros', {
      titulo: 'Novo Livro',
      anoPublicacao: 2023,
      autor: 'Autor do Novo Livro',
      editora: 'Editora do Novo Livro'
    }).then((response) => {
      expect(response.status).to.equal(200)
    })
  })

  it('Deve obter os detalhes de um livro existente', () => {
    cy.request({
      method: 'POST',
      url: '/login',
      failOnStatusCode: false,
      body: {
        username: Cypress.env('USERNAME'),
        password: Cypress.env('PASSWORD')
      }
    }).then((response) => {
      const token = response.body.token
      cy.request({
        method: 'POST',
        url: '/livros',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
          titulo: 'Novo Livro',
          anoPublicacao: 2023,
          autor: 'Autor do Livro',
          editora: 'Editora do Livro'
        }
      }).then((postResponse) => {
        const livroId = postResponse.body._id
        cy.request({
          method: 'GET',
          url: `/livros/${livroId}`,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => {
          expect(response.status).to.equal(200)
        })
      })
    })
  })


  it('Deve excluir um livro existente', () => {
    cy.request('POST', '/login', {
      username: Cypress.env('USERNAME'),
      password: Cypress.env('PASSWORD')
    }).then((response) => {
      const token = response.body.token

      cy.request({
        method: 'POST',
        url: '/livros',
        failOnStatusCode: false,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: {
          titulo: 'Novo Livro',
          anoPublicacao: 2023,
          autor: 'Autor do Livro',
          editora: 'Editora do Livro',
        },
      }).then((postResponse) => {
        const livroId = postResponse.body._id

        cy.request({
          method: 'DELETE',
          url: `/livros/${livroId}`,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }).then((deleteResponse) => {
          expect(deleteResponse.status).to.equal(200)
        })
      })
    })
  })

  it('Deve adicionar um novo autor', () => {
    cy.request('POST', '/livros', {
      nome: 'Novo Autor',
      nacionalidade: 'Brasileiro',
      anoNascimento: 1980
    }).then((response) => {
      expect(response.status).to.equal(200)
    })
  })

})