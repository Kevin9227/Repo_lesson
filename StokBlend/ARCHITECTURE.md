╔════════════════════════════════════════════════════════════════════════════════╗
║                     STOKBLEND API - ARQUITETURA REFATORADA                    ║
║                                                                                ║
║                          🏗️ VISÃO DA ARQUITETURA                              ║
╚════════════════════════════════════════════════════════════════════════════════╝

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                           CLIENT / REQUISIÇÃO                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                                      │
                                      ▼
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                      🛡️ HELMET (Security Headers)                             ┃
┃                         - X-Content-Type-Options                             ┃
┃                         - X-Frame-Options                                    ┃
┃                         - Strict-Transport-Security                          ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                                      │
                                      ▼
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                        🔗 CORS (Origin Validation)                            ┃
┃                      - Configurável via .env                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                                      │
                                      ▼
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                   📋 BODY PARSER (JSON/URL-Encoded)                           ┃
┃                      - Limite de tamanho: 10mb                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                                      │
                                      ▼
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                      📊 MORGAN (Request Logging)                              ┃
┃            - Method, Status, IP, User-Agent, Response Time                  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                                      │
                                      ▼
        ┌─────────────────────────────┬─────────────────────────────┐
        │                             │                             │
        ▼                             ▼                             ▼
   ┌──────────────┐         ┌──────────────────┐         ┌──────────────┐
   │ /health      │         │ /api/stokblend/* │         │  Outras      │
   │ (Público)    │         │   (Privado)      │         │  Rotas       │
   │              │         │                  │         │              │
   │   ✓ 200 OK   │         │                  │         │              │
   └──────────────┘         └────────┬─────────┘         └──────────────┘
                                     │
                                     ▼
                    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
                    ┃  🚦 RATE LIMITER (Por IP)        ┃
                    ┃  - Máx: 100 req/min              ┃
                    ┃  - Janela: 60 segundos           ┃
                    ┃  - Status: 200 ou 429           ┃
                    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                                     │
                        ┌────────────┼────────────┐
                        │            │            │
                   ❌ 429      ✓ 200 OK      ▼
                   (Limite)                 (Próximo)
                                     │
                                     ▼
                    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
                    ┃  🚦 RATE LIMITER (Por Token)    ┃
                    ┃  - Máx: 200 req/min              ┃
                    ┃  - Janela: 60 segundos           ┃
                    ┃  - Status: 200 ou 429           ┃
                    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                                     │
                        ┌────────────┼────────────┐
                        │            │            │
                   ❌ 429      ✓ 200 OK      ▼
                   (Limite)                 (Próximo)
                                     │
                                     ▼
                    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
                    ┃  🔐 VALIDAR TOKEN                ┃
                    ┃  - Verificar Header              ┃
                    ┃  - Validar em tokens.json        ┃
                    ┃  - Capturar IP                   ┃
                    ┃  - Adicionar ao req              ┃
                    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                                     │
                   ┌─────────────────┼─────────────────┐
                   │                 │                 │
              ❌ 401           ❌ 403           ✓ Válido
              (Ausente)        (Inválido)       │
                                                ▼
                    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
                    ┃  ⏱️  TIMEOUT MIDDLEWARE          ┃
                    ┃  - 15 segundos                   ┃
                    ┃  - Resposta: 504                 ┃
                    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                                     │
                   ┌─────────────────┼─────────────────┐
                   │                 │                 │
              ❌ 504           ✓ OK (Continue)
              (Timeout)        │
                                     ▼
                    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
                    ┃  🛣️ ROTA ESPECÍFICA              ┃
                    ┃  - /cosmeticos                   ┃
                    ┃  - /farmav1                      ┃
                    ┃  - /farmav2                      ┃
                    ┃  - /ferrav1                      ┃
                    ┃  - /oficina                      ┃
                    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                                     │
                                     ▼
                    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
                    ┃  📊 BUSCAR DADOS                 ┃
                    ┃  - Sanitizar query               ┃
                    ┃  - Validar parâmetros            ┃
                    ┃  - Conectar MongoDB              ┃
                    ┃  - Executar query                ┃
                    ┃  - Limite 1000 resultados        ┃
                    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                                     │
                        ┌────────────┼────────────┐
                        │            │            │
                  ❌ Erro        ✓ OK      ▼
                   (500)        (200)   (Vazio?)
                                        │
                                        ▼
                    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
                    ┃  📋 FORMATAR RESPOSTA            ┃
                    ┃  {                               ┃
                    ┃    "code": 200,                  ┃
                    ┃    "status": "Success",          ┃
                    ┃    "message": "...",             ┃
                    ┃    "data": [...],                ┃
                    ┃    "timestamp": "..."            ┃
                    ┃  }                               ┃
                    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                                     │
                                     ▼
                        ┌────────────────────────────┐
                        │   Adicionar Headers:       │
                        │   X-RateLimit-Limit: 100   │
                        │   X-RateLimit-Remaining: N │
                        └────────────────────────────┘
                                     │
                                     ▼
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                         📤 RESPOSTA AO CLIENT                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


═══════════════════════════════════════════════════════════════════════════════

                        📊 ESTRUTURA DE MIDDLEWARES

┌────────────────────────────────────────────────────────────────────────────┐
│ Ordem de Execução:                                                         │
├────────────────────────────────────────────────────────────────────────────┤
│ 1. Helmet                    ← Headers de segurança                        │
│ 2. CORS                      ← Validação de origem                         │
│ 3. Body Parser               ← Parse JSON/URL                             │
│ 4. Morgan                    ← Logging                                     │
│ 5. Rate Limiter (IP)         ← Proteção contra abuso                       │
│ 6. Timeout                   ← Limite de tempo                             │
│ 7. Route Matching            ← /health vs /api/stokblend                   │
│ 8. Validar Token             ← Autenticação                                │
│ 9. Route Handler             ← Processar lógica                            │
│ 10. Error Handler            ← Capturar erros                              │
└────────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════

                      🔄 FLUXO DE RATE LIMITING

                    Requisição #1 (IP: 192.168.1.100)
                                │
                                ▼
                    ┌───────────────────────────┐
                    │ Registrar IP              │
                    │ Count: 1                  │
                    │ Reset em: 60s             │
                    └───────────────────────────┘
                                │
                    ✓ Permitido (1/100)
                                │
    ┌───────────────────────────┼───────────────────────────┐
    │                           │                           │
 Req #2 (IP dup)         Req #100 (IP dup)          Req #101 (IP dup)
 Count: 2                Count: 100                  Count: 101
 ✓ Permitido (2/100)     ✓ Permitido (100/100)       ❌ BLOQUEADO 429!
                                                     "Tente novamente em 45s"


═══════════════════════════════════════════════════════════════════════════════

                      🗂️ ESTRUTURA DE DIRETÓRIOS

StokBlend/
│
├── app.js                          ← Ponto de entrada
├── package.json                    ← Dependências
├── tokens.json                     ← Base de tokens
├── .env.example                    ← Exemplo de configuração
│
├── 📁 config/
│   ├── constants.js                ← ⭐ Configurações centralizadas
│   ├── dbconnection.js             ← Conexão MongoDB
│   └── server.js                   ← ⭐ Setup Express refatorado
│
├── 📁 src/
│   ├── 📁 middleware/
│   │   ├── rateLimiter.js          ← ⭐ Rate limiting
│   │   └── validarToken.js         ← ⭐ Validação token melhorada
│   │
│   ├── 📁 models/
│   │   └── mdconsulta.js           ← ⭐ Queries seguras
│   │
│   ├── 📁 routes/
│   │   ├── cosmeticos.js           ← ⭐ Rota refatorada
│   │   ├── farmav1.js
│   │   ├── farmav2.js
│   │   ├── ferrav1.js
│   │   └── oficina.js
│   │
│   └── 📁 helpers/
│       └── responseHelper.js       ← ⭐ Helpers de resposta
│
└── 📁 docs/
    ├── REFACTORING.md              ← ⭐ Documentação técnica
    ├── CHANGES_SUMMARY.md          ← ⭐ Resumo mudanças
    ├── IMPLEMENTATION_GUIDE.md     ← ⭐ Guia implementação
    └── test-api.sh                 ← ⭐ Script de testes


═══════════════════════════════════════════════════════════════════════════════

                            ✨ RESUMO DAS MELHORIAS

┌────────────────────────────────────────────────────────────────────────────┐
│ ✅ Rate Limiting                                                           │
│    → Por IP (100 req/min)                                                  │
│    → Por Token (200 req/min)                                               │
│    → Limpeza automática de memória                                         │
│                                                                            │
│ ✅ Segurança                                                               │
│    → Helmet headers                                                        │
│    → CORS configurável                                                     │
│    → Sanitização de inputs                                                 │
│    → Validação robusta de tokens                                           │
│                                                                            │
│ ✅ Performance                                                             │
│    → Tokens carregados na inicialização                                    │
│    → Cache de resultados (futuro: Redis)                                   │
│    → Limite de tamanho de queries                                          │
│                                                                            │
│ ✅ Manutenibilidade                                                        │
│    → Configurações centralizadas                                           │
│    → Helpers reutilizáveis                                                 │
│    → Código bem comentado                                                  │
│    → Logging estruturado                                                   │
│                                                                            │
│ ✅ Escalabilidade                                                          │
│    → Fácil adicionar novas rotas                                           │
│    → Middleware modular                                                    │
│    → Variáveis de ambiente                                                 │
│    → Preparado para migration futura (JWT, etc)                            │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════

                          🎯 PRÓXIMOS PASSOS (Sugerido)

1. 🔄 Implementar JWT tokens em vez de tokens estáticos
2. 🚀 Adicionar cache com Redis
3. 📊 Integrar Prometheus para monitoramento
4. 🧪 Criar testes unitários (Jest)
5. 📖 Swagger/OpenAPI documentation
6. 🐳 Docker containerization
7. 🔄 CI/CD pipeline (GitHub Actions)
8. 💾 Database migrations

═══════════════════════════════════════════════════════════════════════════════
