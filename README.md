# Projeto Web

Este projeto é parte da disciplina e tem como objetivo permitir que os alunos apliquem os conceitos e temas abordados em aula. O projeto consiste no desenvolvimento de um sistema web, onde o aluno tem a liberdade de escolher o domínio do sistema, desde que atenda aos requisitos definidos. Este repositório contém o código-fonte do projeto web que utiliza as seguintes tecnologias: Node.js, Express.js, MongoDB, EJS, entre outras.

### Ciclo 1 - Site de Apresentação

Neste ciclo inicial, cada projeto deve atender aos seguintes requisitos e realizar as seguintes atividades:

- Definir um nome (e um logo) para o sistema.
- Criar um repositório na plataforma GitHub.
- Definir um template e padrão visual para o site, incluindo cabeçalho e rodapé.
- Criar um arquivo para conter as configurações da aplicação web, como senhas e parâmetros necessários para o seu funcionamento (pesquisar sobre dotenv).
- Criar uma página inicial para o site com um breve resumo da proposta e os links para as demais páginas. A página inicial também deve conter um formulário de login, que ainda não precisa funcionar.
- Criar uma página com uma descrição detalhada do que será desenvolvido.
- Criar uma página para listar as tecnologias e ferramentas que serão utilizadas. Todas as bibliotecas utilizadas devem ser listadas nesta página.
- Criar uma página para descrever o desenvolvedor do projeto e outras pessoas relacionadas a ele.
- Criar uma página de contato, onde os usuários poderão enviar mensagens por email para os desenvolvedores da ferramenta. Os campos obrigatórios são nome, e-mail, assunto e mensagem (pesquisar sobre como enviar emails).

Para o desenvolvimento deste ciclo, é obrigatório utilizar o framework Express.js. Os demais pacotes e recursos utilizados são de livre escolha de cada desenvolvedor. Neste ciclo, não é necessário criar uma API para separação entre back-end e front-end. O conteúdo e os dados devem ser disponibilizados em um único servidor. No entanto, é permitido o uso de um framework front-end como React, Vue ou Angular, desde que estejam integrados em um único projeto.

### Ciclo 2 - Sistema Completo integrado com Banco

Nesta segunda etapa do projeto, o objetivo é criar um sistema dinâmico integrado com um banco de dados (relacional ou NoSQL) por meio de uma API web (back-end) e um cliente web (front-end) que consumirá a API desenvolvida.

Como requisito principal, o sistema deve permitir pelo menos 3 tipos de cadastros (operações de CRUD completas) que apresentem um relacionamento de um-para-muitos ou muitos-para-muitos, de acordo com a escolha de cada aluno. Um desses cadastros deve ser relacionado ao usuário. O front-end da aplicação deve consumir a API desenvolvida, realizar a validação dos dados fornecidos pelo usuário, além de tratar os erros e mensagens geradas pela API.

A API também deve realizar a validação dos campos, considerando que os dados podem vir de uma fonte diferente do cliente desenvolvido. Mensagens de erro e sucesso devem ser enviadas juntamente com as respostas. Os métodos HTTP GET, POST, PUT e DELETE devem ser utilizados de acordo com a operação a ser executada. O banco de dados pode ser relacional (ex. MySQL ou PostgreSQL) ou NoSQL (ex. MongoDB).

Em resumo, os seguintes recursos foram desenvolvidos:

- Implementação de uma API REST.
- Consumo assíncrono dos dados da API pelo cliente.
- Cadastro de usuário.
- Controle de acesso com autenticação de usuários utilizando JWT (API e cliente).
- Possibilidade do usuário alterar seus dados e excluir sua conta.
- Listagem dos dados de pelo menos uma coleção, permitindo paginação e ordenação por diferentes atributos.
- Exibição dos detalhes de um registro de cada coleção.
- Inserção de novos registros para cada coleção com validação adequada.
- Atualização de um registro para cada coleção.
- Exclusão de um registro de cada coleção.
- Desenvolvimento de um relacionamento (1-N ou N-M) entre essas coleções, onde um formulário de cadastro deve permitir a escolha de um ou vários itens relacionados.
- Validação de entradas de dados no cliente e no servidor.
- Tratamento de erros no cliente e no servidor.
- Atualização do arquivo de configuração com os detalhes de acesso ao banco de dados.
- Implementação de uma rota que realiza uma carga automática dos dados, garantindo que cada coleção tenha pelo menos 5 registros prévios.
- Desenvolvimento de uma rota que exiba um relatório no formato de gráfico e que possa ser exportado em PDF.

![inicial](https://github.com/M4deN/Projeto_WEB/blob/main/public/images/initial.png)

## Funcionalidades

O projeto consiste em uma aplicação web para gerenciamento de livros, com as seguintes funcionalidades:

- Listar todos os livros cadastrados
- Adicionar um novo livro
- Obter os detalhes de um livro
- Atualizar informações de um livro
- Excluir um livro
- Cadastro de usuários
- Alteração de cadastro e exclusão de conta

![book](https://github.com/M4deN/Projeto_WEB/blob/main/public/images/book1.png)

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- Node.js (versão 14 ou superior)
- MongoDB (instância local ou remota)
- Navegador web compatível

## Instalação

Siga as etapas abaixo para executar a aplicação em seu ambiente local:

1. Clone este repositório para o seu diretório local:

   ```
   git clone https://github.com/seu-usuario/projeto-web.git
   ```

2. Acesse o diretório do projeto:

   ```
   cd projeto-web
   ```

3. Instale as dependências do projeto:

   ```
   npm install
   ```

4. Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente necessárias, como a URL de conexão com o MongoDB.

5. Inicie a aplicação:

   ```
   npm start
   ```

6. Acesse a aplicação em seu navegador web:

   ```
   http://localhost:3000
   ```

## Testes

O projeto inclui testes automatizados para as funcionalidades da API REST. Os testes são desenvolvidos utilizando a biblioteca Cypress.

Para executar os testes automatizados, certifique-se de que a aplicação esteja em execução. Em seguida, execute o seguinte comando no diretório raiz do projeto:

```
npx cypress open
```

Isso abrirá a interface do Cypress, onde você poderá selecionar e executar os testes desejados.

![Testes](https://github.com/M4deN/Projeto_WEB/blob/main/public/images/Tests.png)

## Estrutura de Arquivos

A estrutura de arquivos do projeto é organizada da seguinte forma:

- `app.js`: arquivo principal do aplicativo, configuração do servidor Express e definição das rotas.
- `routes/index.js`: arquivo com as rotas da aplicação.
- `models/livro.js`: arquivo contendo o modelo do livro para o MongoDB.
- `controllers/livrosController.js`: arquivo com os controladores das rotas relacionadas aos livros.
- `public/`: diretório que contém arquivos estáticos, como CSS e JavaScript.
- `views/`: diretório que contém os templates EJS utilizados para renderizar as páginas HTML.
- `cypress/`: diretório que contém os arquivos de testes automatizados.

## Licença

Este projeto está licenciado sob a Licença ISC. Consulte o arquivo [LICENSE](./LICENSE) para obter mais informações.
