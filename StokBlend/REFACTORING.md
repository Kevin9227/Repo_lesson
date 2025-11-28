# 🔄 Refatoração da API StokBlend

## 📋 Resumo das Melhorias Implementadas

### ✅ 1. **Rate Limiting Robusto** (`src/middleware/rateLimiter.js`)
- **Limite por IP**: 100 requisições/minuto
- **Limite por Token**: 200 requisições/minuto
- Proteção contra abuso e DDoS
- Headers informativos de rate limit (`X-RateLimit-*`)
- Limpeza automática de registros antigos (memória)

**Como funciona:**
```javascript
// Cada requisição é verificada por IP
// Se tem token, é verificado também por token
// Retorna 429 Too Many Requests se exceder limite
```

### ✅ 2. **Validação de Token Melhorada** (`src/middleware/validarToken.js`)
- Carregamento seguro do arquivo `tokens.json`
- Validação de formato do token
- Logging estruturado com informações de IP
- Tratamento robusto de erros
- Suporte para proxies (X-Forwarded-For)

### ✅ 3. **Configurações Centralizadas** (`config/constants.js`)
- Variáveis de ambiente bem organizadas
- Constantes de status HTTP
- Mensagens padronizadas
- Fácil manutenção e escalabilidade

### ✅ 4. **Consultas ao Banco Seguras** (`src/models/mdconsulta.js`)
- Sanitização de queries contra injections
- Limite de 1000 resultados por query
- Tratamento robusto de erros
- Respostas estruturadas e consistentes
- Logging detalhado de operações

### ✅ 5. **Helpers de Resposta** (`src/helpers/responseHelper.js`)
- Formatação padronizada de respostas
- Funções para sucesso e erro
- Validação de parâmetros
- Mensagens consistentes

### ✅ 6. **Servidor Refatorado** (`config/server.js`)
- Middlewares organizados e comentados
- Tratamento global de erros
- Routa de health check (`/health`)
- Timeout configurável
- CORS seguro
- Helmet para headers de segurança

### ✅ 7. **Rota de Exemplo Melhorada** (`src/routes/cosmeticos.js`)
- Logging estruturado
- Tratamento de erros apropriado
- Remoção de funções não utilizadas
- Respostas consistentes

### ✅ 8. **Inicialização Segura** (`app.js`)
- Tratamento de erros não capturados
- Graceful shutdown
- Mensagem de inicialização clara

---

## 🚀 Como Usar

### 1. **Configurar Variáveis de Ambiente**
```bash
cp .env.example .env
# Editar .env com suas configurações
```

### 2. **Instalar Dependências**
```bash
npm install
```

### 3. **Iniciar o Servidor**
```bash
npm start          # Produção
npm run dev        # Desenvolvimento (nodemon)
```

### 4. **Health Check**
```bash
curl http://localhost:3500/health
```

### 5. **Fazer Requisições Autenticadas**
```bash
curl -H "Authorization: SEU_TOKEN_AQUI" \
  http://localhost:3500/api/stokblend/cosmeticos?familia=maquiagem
```

---

## 📊 Rate Limiting - Exemplos

### Sem exceder limite (✅ 200 OK)
```bash
curl -H "Authorization: token123" \
  http://localhost:3500/api/stokblend/cosmeticos
```

### Excedendo limite por IP (❌ 429 Too Many Requests)
```json
{
  "code": 429,
  "status": "Error",
  "message": "Limite de requisições excedido. Tente novamente em 45s.",
  "data": {
    "retryAfter": 45,
    "limitType": "IP"
  }
}
```

---

## 🔒 Segurança

### Headers Implementados
- **Helmet**: Headers de segurança HTTP
- **CORS**: Validação de origem
- **Rate Limiting**: Proteção contra abuso
- **Validação**: Sanitização de inputs
- **Timeout**: Proteção contra requisições longas

### Boas Práticas
- ✅ Tokens carregados na inicialização (validação rápida)
- ✅ Queries sanitizadas (proteção contra injection)
- ✅ Erro genérico para usuários (detalhes apenas em dev)
- ✅ Logging estruturado para auditoria
- ✅ Limite de 1000 resultados por query

---

## 📝 Variáveis de Ambiente Importantes

```env
# Rate Limiting (em requisições por minuto)
IP_MAX_REQUESTS=100          # Limite por IP
TOKEN_MAX_REQUESTS=200       # Limite por Token

# Timeouts
REQUEST_TIMEOUT=15000        # 15 segundos
DATABASE_TIMEOUT=30000       # 30 segundos

# Ambiente
NODE_ENV=development|production
CORS_ORIGIN=* ou específico (ex: http://localhost:3000)
```

---

## 🛠️ Estrutura de Arquivos

```
.
├── config/
│   ├── constants.js          # Configurações centralizadas
│   ├── dbconnection.js       # Conexão MongoDB
│   └── server.js             # Configuração Express
├── src/
│   ├── middleware/
│   │   ├── rateLimiter.js    # ⭐ Rate Limiting
│   │   └── validarToken.js   # ⭐ Validação Token
│   ├── models/
│   │   └── mdconsulta.js     # ⭐ Consultas Seguras
│   ├── routes/
│   │   ├── cosmeticos.js     # ⭐ Rota Refatorada
│   │   ├── farmav1.js
│   │   ├── farmav2.js
│   │   ├── ferrav1.js
│   │   └── oficina.js
│   └── helpers/
│       └── responseHelper.js # ⭐ Helpers Respostas
├── app.js                    # ⭐ Inicialização Refatorada
├── .env.example              # ⭐ Novo
└── tokens.json               # Base de tokens
```

---

## 🔄 Próximas Melhorias Sugeridas

1. **JWT Tokens**: Implementar JWT em vez de tokens estáticos
2. **Cache**: Adicionar Redis para cache de queries frequentes
3. **Validação Schemas**: Usar Joi ou Yup para validação
4. **Testes**: Implementar testes unitários e E2E
5. **Documentação API**: Swagger/OpenAPI
6. **Monitoramento**: Prometheus/Grafana
7. **CI/CD**: GitHub Actions ou similar
8. **Database Migrations**: Controle de versão do schema

---

## ❓ Dúvidas?

Consulte os comentários dentro dos arquivos ou a documentação do Express/MongoDB.

**Última atualização**: 2025-11-28
