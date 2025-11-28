# StockBlend — Documentação local e demo

Este projeto contém uma página de documentação e demonstração (frontend) para a API StockBlend.

## Como testar o demo localmente

1. Abra `index.html` no navegador (pode usar um servidor local para evitar restrições de CORS):

```bash
# usando Python 3 (recomendado)
python -m http.server 8000
# em seguida abra http://localhost:8000/index.html
```

2. Na seção "Documentação" escolha um endpoint no seletor e clique em `Try it — executar endpoint`.

3. O demo envia um `GET` para `window.location.origin + <rota selecionada>` com o cabeçalho `Authorization` contendo o token exibido na tela.

### Token padrão usado no demo
O token de acesso padrão configurado é:

```
XYZ,12345678
```

O demo envia o cabeçalho `Authorization` no formato `Bearer <token>` (por exemplo `Authorization: Bearer XYZ,12345678`). Se o token já contiver o prefixo `Bearer `, o demo utilizará o valor tal como fornecido. Você pode mudar o token clicando em `Alterar token` e colando outro valor (insira apenas o token, sem o prefixo `Bearer`).

## Endpoints incluídos no seletor
- `/api/stokblend/farmaciav1`
- `/api/stokblend/farmaciav2`
- `/api/stokblend/cosmeticos`
- `/api/stokblend/ferramentasv1`

## Observações sobre CORS e origem da API
- O demo assume que a API está no mesmo host (mesmo `origin`) que a página. Se a API estiver em outro domínio, atualize a variável `url` em `assets/js/main.js` para apontar para o domínio correto.
- Se a API estiver em outro domínio, o servidor da API precisará permitir CORS para aceitar requisições vindas do seu site local (incluir header `Access-Control-Allow-Origin`).
- Se a API exigir outro esquema de autorização (ex: `Bearer <token>`), atualize também como o cabeçalho `Authorization` é montado no `main.js`.

## Como personalizar
- Mudar token padrão: editar o elemento com id `token-display` em `index.html` ou usar o botão `Alterar token` na UI.
- Mudar rotas: editar o `select#endpoint-select` em `index.html`.
- Alterar headers adicionais: editar `fetch` em `assets/js/main.js`.

## Próximos passos possíveis
- Adicionar autenticação via OAuth/OpenID Connect se necessário.
- Implementar proxy simples para contornar CORS durante testes.
- Adicionar exemplos de POST/PUT/DELETE com formulários e autenticação.

---

Se quiser, eu posso:
- 1) Apontar o demo para um domínio remoto específico (forneça a URL base), ou
- 2) Implementar um pequeno proxy Node/Python para contornar CORS localmente, ou
- 3) Adicionar exemplos interativos para métodos POST/PUT.
