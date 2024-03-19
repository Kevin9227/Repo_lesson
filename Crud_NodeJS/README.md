# Projeto CRUD

Um projeto simples de CRUD (Create, Read, Update, Delete) para gerenciar uma lista de Stock.

## Instalação

1. Clone o repositório: `git clone https://github.com/seu-usuario/projeto-crud.git`
2. Instale as dependências: `npm install`
3. Configure o banco de dados: `npm run db:setup`
4. Inicie o servidor: `npm start`

## Uso

- Para criar um novo produto, faça uma requisição POST para `/criar` com os dados do protudo.
- Para listar os produtos existente, faça uma requisição GET para `/index `.
- Para atualizar um produto, faça uma requisição PUT para `/editar/:ref` com os dados atualizados do produto.
- Para excluir um produto, faça uma requisição DELETE para `/apagar/:ref`.

## Funcionalidades

- Criar um novo produto
- Ler listagem e pequisa de todos os produtos
- Atualizar um produto
- Excluir um produto

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um pull request com melhorias ou correções de bugs.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
