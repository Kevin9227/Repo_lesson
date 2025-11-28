/**
 * Configurações centralizadas da aplicação
 */

module.exports = {
  // Servidor
  PORT: process.env.PORT || 3500,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Banco de dados
  DATABASE_URL: process.env.DATABASE_URL,
  DB_NAME: 'stokblend',

  // Rate Limiting
  RATE_LIMIT: {
    IP_MAX_REQUESTS: parseInt(process.env.IP_MAX_REQUESTS || '100', 10),
    IP_WINDOW_MS: parseInt(process.env.IP_WINDOW_MS || '60000', 10), // 1 minuto

    TOKEN_MAX_REQUESTS: parseInt(process.env.TOKEN_MAX_REQUESTS || '200', 10),
    TOKEN_WINDOW_MS: parseInt(process.env.TOKEN_WINDOW_MS || '60000', 10), // 1 minuto
  },

  // Timeouts
  REQUEST_TIMEOUT: parseInt(process.env.REQUEST_TIMEOUT || '15000', 10), // 15 segundos
  DATABASE_TIMEOUT: parseInt(process.env.DATABASE_TIMEOUT || '30000', 10), // 30 segundos

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  LOG_FILE: process.env.LOG_FILE || './logs/app.log',

  // Segurança
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  MAX_JSON_SIZE: '10mb',
  MAX_URL_ENCODED_SIZE: '10mb',

  // Rotas
  API_PREFIX: '/api/stokblend',

  // Status codes padrão
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
  },

  // Mensagens padrão
  MESSAGES: {
    TOKEN_NOT_PROVIDED: 'Token de autenticação não fornecido.',
    INVALID_TOKEN: 'Token de autenticação inválido.',
    RATE_LIMIT_EXCEEDED: 'Limite de requisições excedido.',
    INVALID_PARAMS: 'Parâmetros inválidos.',
    NO_RESULTS: 'A consulta não retornou nenhum resultado.',
    DATABASE_ERROR: 'Erro ao acessar o banco de dados.',
    INTERNAL_ERROR: 'Erro interno do servidor.',
    NOT_FOUND: 'Recurso não encontrado.',
  },
};
