# 🚀 Guia de Implementação - Rate Limiting & Refatoração

## ✅ Tudo Já Implementado!

Todos os arquivos foram criados e refatorados. Veja abaixo como usar.

---

## 📦 Novos Componentes

### 1. **Rate Limiter** (`src/middleware/rateLimiter.js`)
```javascript
// Uso automático - integrado em config/server.js
app.use(rateLimitMiddleware); // Já ativo!

// Configuração via variáveis de ambiente
IP_MAX_REQUESTS=100          // Limite por IP
IP_WINDOW_MS=60000           // Janela de tempo

TOKEN_MAX_REQUESTS=200       // Limite por Token
TOKEN_WINDOW_MS=60000
```

### 2. **Constantes Centralizadas** (`config/constants.js`)
```javascript
// Acesso fácil a todas as configurações
const constants = require('./config/constants');

console.log(constants.PORT);                      // 3500
console.log(constants.RATE_LIMIT.IP_MAX_REQUESTS); // 100
console.log(constants.MESSAGES.INVALID_TOKEN);    // Msg padronizada
```

### 3. **Helpers de Resposta** (`src/helpers/responseHelper.js`)
```javascript
// Respostas padronizadas
const { responses, successResponse, errorResponse } = require('../helpers/responseHelper');

res.status(200).json(successResponse(200, 'Sucesso', dados));
res.status(404).json(responses.notFound());
res.status(429).json(responses.rateLimitExceeded(45));
```

---

## 🎯 Fluxo de uma Requisição

```
1️⃣ Requisição chega
   ↓
2️⃣ Validação de Rate Limit (IP)
   ├─ Dentro do limite? → Prosseguir ✓
   └─ Limite excedido? → 429 Too Many Requests ✗
   ↓
3️⃣ Validação de Rate Limit (Token - se fornecido)
   ├─ Dentro do limite? → Prosseguir ✓
   └─ Limite excedido? → 429 Too Many Requests ✗
   ↓
4️⃣ Validação de Token
   ├─ Token válido? → Prosseguir ✓
   └─ Inválido/Ausente? → 401/403 ✗
   ↓
5️⃣ Processing (rota específica)
   ├─ Sucesso? → 200 com dados ✓
   └─ Erro? → Erro apropriado ✗
```

---

## 🔧 Configuração (3 Passos)

### Passo 1: Criar arquivo `.env`
```bash
# Copiar do exemplo
cp .env.example .env

# Editar com suas configurações (opcional)
nano .env
```

### Passo 2: Instalar dependências
```bash
npm install
```

### Passo 3: Iniciar servidor
```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm start
```

---

## 📡 Exemplos de Requisições

### ✅ Health Check (sem autenticação)
```bash
curl http://localhost:3500/health

# Resposta
{
  "code": 200,
  "status": "Success",
  "message": "API está operacional",
  "data": {
    "timestamp": "2025-11-28T10:30:45.123Z"
  }
}
```

### ✅ Requisição com Token
```bash
TOKEN="ABC,W9I9W9E"
curl -H "Authorization: $TOKEN" \
  http://localhost:3500/api/stokblend/cosmeticos

# Resposta de sucesso
{
  "code": 200,
  "status": "Success",
  "message": "Consulta realizada com sucesso",
  "data": [
    { "codigo": "001", "familia": "maquiagem", "Descricao": "..." },
    ...
  ]
}
```

### ❌ Sem Token
```bash
curl http://localhost:3500/api/stokblend/cosmeticos

# Resposta
{
  "code": 401,
  "status": "Error",
  "message": "Token de autenticação não fornecido.",
  "data": null
}
```

### ❌ Token Inválido
```bash
curl -H "Authorization: INVALIDO" \
  http://localhost:3500/api/stokblend/cosmeticos

# Resposta
{
  "code": 403,
  "status": "Error",
  "message": "Token de autenticação inválido.",
  "data": null
}
```

### ⏱️ Rate Limit Excedido
```bash
# Após 100+ requisições em 1 minuto
curl -H "Authorization: ABC,W9I9W9E" \
  http://localhost:3500/api/stokblend/cosmeticos

# Resposta
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

### 🔍 Busca com Parâmetros
```bash
TOKEN="ABC,W9I9W9E"

# Por família
curl -H "Authorization: $TOKEN" \
  "http://localhost:3500/api/stokblend/cosmeticos?familia=maquiagem"

# Por código
curl -H "Authorization: $TOKEN" \
  "http://localhost:3500/api/stokblend/cosmeticos?codigo=12345"

# Por descrição
curl -H "Authorization: $TOKEN" \
  "http://localhost:3500/api/stokblend/cosmeticos?descricao=creme"

# Combinado
curl -H "Authorization: $TOKEN" \
  "http://localhost:3500/api/stokblend/cosmeticos?familia=maquiagem&descricao=batom"
```

---

## 🧪 Testes Automáticos

### Executar suite de testes
```bash
# Windows (PowerShell)
bash test-api.sh

# Ou manualmente com curl
for i in {1..150}; do
  curl -s -H "Authorization: ABC,W9I9W9E" \
    http://localhost:3500/api/stokblend/cosmeticos > /dev/null
done
```

---

## 📊 Monitoramento

### Logs da Aplicação
```
✓ Token válido: ABC,W9... | IP: 192.168.1.100
📥 Requisição GET /cosmeticos
📊 Consultando cosmeticos: {"familia":"maquiagem"}
✓ 5 resultado(s) encontrado(s)
```

### Headers de Rate Limit
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
```

---

## ⚙️ Personalização

### Aumentar limite de requisições
```bash
# .env
IP_MAX_REQUESTS=500        # 500 req/min por IP
TOKEN_MAX_REQUESTS=1000    # 1000 req/min por Token
```

### Alterar janela de tempo
```bash
# .env
IP_WINDOW_MS=120000        # 2 minutos
TOKEN_WINDOW_MS=120000     # 2 minutos
```

### Timeout de requisição
```bash
# .env
REQUEST_TIMEOUT=30000      # 30 segundos
```

### Modo desenvolvimento vs produção
```bash
# .env
NODE_ENV=development       # Mostra detalhes de erro
# ou
NODE_ENV=production        # Esconde detalhes
```

---

## 📚 Arquivos Importantes

| Arquivo | Função | Editar? |
|---------|--------|---------|
| `.env` | Variáveis de ambiente | ✅ SIM |
| `tokens.json` | Lista de tokens válidos | ✅ SIM |
| `src/middleware/rateLimiter.js` | Rate limiting | ⚠️ CUIDADO |
| `config/constants.js` | Configurações | ⚠️ CUIDADO |
| `config/server.js` | Setup Express | ⚠️ CUIDADO |

---

## 🐛 Troubleshooting

### Erro: "Token não encontrado"
```
Solução: Verificar se o token em .env está em tokens.json
```

### Erro: "Rate limit excedido"
```
Solução: Aguardar 1 minuto ou aumentar IP_MAX_REQUESTS em .env
```

### Erro: "Conexão recusada"
```
Solução: Verificar se MongoDB está rodando
Verificar DATABASE_URL em .env
```

### Porta já em uso
```
Solução: Alterar PORT em .env
Ou: netstat -ano | findstr :3500 (Windows)
    lsof -i :3500 (Linux/Mac)
```

---

## 📞 Suporte

Consulte os arquivos de documentação:
- `REFACTORING.md` - Detalhes técnicos completos
- `CHANGES_SUMMARY.md` - Resumo das mudanças
- `test-api.sh` - Script de testes

---

## ✨ Conclusão

✅ Rate limiting por IP e Token implementado
✅ Segurança melhorada
✅ Código refatorado e organizado
✅ Configurações centralizadas
✅ Logging estruturado
✅ Tratamento de erros robusto

**Tudo pronto para produção!** 🚀
