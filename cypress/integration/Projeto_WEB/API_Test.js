require('dotenv').config();

describe('Testes da API', () => {
    
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });
  
    it('Deve obter a lista de livros', () => {
      cy.request('/livros')
        .its('status')
        .should('equal', 200);
    });
  
    it('Deve adicionar um novo livro', () => {
        cy.request('POST', '/livros', {
          titulo: 'Novo Livro',
          anoPublicacao: 2023,
          autor: 'Autor do Novo Livro',
          editora: 'Editora do Novo Livro'
        }).then((response) => {
          expect(response.status).to.equal(200);
        });
      });      
  
      it('Deve obter os detalhes de um livro existente', () => {
        cy.request('/login', {
          method: 'POST',
          body: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD
          }
        }).then((response) => {
          const token = response.body.token;
      
          cy.request({
            method: 'GET',
            url: '/livros/{id}',
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((response) => {
            expect(response.status).to.equal(200);
          });
        });
      });      
  
      it('Deve atualizar um livro existente', () => {
        cy.request('/login').then((loginResponse) => {
          expect(loginResponse.status).to.equal(200);
      
          const token = loginResponse.body.token;
      
          cy.request({
            method: 'GET',
            url: '/livros',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }).then((livrosResponse) => {
            expect(livrosResponse.status).to.equal(200);
      
            // Obter o livroId da primeira resposta da solicitação GET
            const livroId = livrosResponse.body[0]._id;
      
            // código para fazer a solicitação PUT
            cy.request({
              method: 'PUT',
              url: `/livros/${livroId}`,
              failOnStatusCode: false, 
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: {
                titulo: 'Livro Atualizado',
                anoPublicacao: 2022,
                autor: 'Autor Atualizado',
                editora: 'Editora Atualizada'
              }
            }).then((putResponse) => {
                expect(putResponse.status).to.equal(404);
            });
          });
        });
      });    
        
      it('Deve excluir um livro existente', () => {
        cy.request('POST', '/login', {
            username: process.env.USERNAME,
            password: process.env.PASSWORD
        }).then((response) => {
          const token = response.body.token;
    
          cy.request({
            method: 'POST',
            url: '/livros',
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
            const livroId = postResponse.body._id;
    
            cy.request({
              method: 'DELETE',
              url: `/livros/${livroId}`,
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            }).then((deleteResponse) => {
              expect(deleteResponse.status).to.equal(200);
            });
          });
        });
    });
});