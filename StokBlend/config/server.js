const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const { rateLimitMiddleware } = require('../src/middleware/rateLimiter');
const { validarToken } = require('../src/middleware/validarToken');
const constants = require('./constants');

/**
 * ============================================
 * MIDDLEWARES DE SEGURANÇA
 * ============================================
 */

// Helmet: Headers de segurança HTTP
app.use(helmet());

// CORS: Controla acesso entre origens
app.use(
  cors({
    origin: constants.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

/**
 * ============================================
 * MIDDLEWARES DE PARSING
 * ============================================
 */

// Parse JSON bodies
app.use(bodyParser.json({ limit: constants.MAX_JSON_SIZE }));

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ limit: constants.MAX_URL_ENCODED_SIZE, extended: true }));

/**
 * ============================================
 * MIDDLEWARES DE LOGGING
 * ============================================
 */

// Morgan: Log de requisições HTTP
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms'));

/**
 * ============================================
 * MIDDLEWARES DE PROTEÇÃO
 * ============================================
 */

// Rate Limiting: Aplica limite de requisições
app.use(rateLimitMiddleware);

// Timeout para requisições
app.use((req, res, next) => {
  req.setTimeout(constants.REQUEST_TIMEOUT, () => {
    res.status(504).json({
      code: 504,
      status: 'Error',
      message: 'Requisição expirou (timeout).',
      data: null,
    });
  });
  next();
});

/**
 * ============================================
 * ROTAS PÚBLICAS (sem autenticação)
 * ============================================
 */

app.get('/health', (req, res) => {
  res.json({
    code: 200,
    status: 'Success',
    message: 'API está operacional',
    data: { timestamp: new Date().toISOString() },
  });
});

/**
 * ============================================
 * APLICAR AUTENTICAÇÃO EM TODAS AS ROTAS
 * ============================================
 */

// Middleware de autenticação (aplica antes das rotas protegidas)
app.use(constants.API_PREFIX, validarToken);

/**
 * ============================================
 * ROTAS PROTEGIDAS (com autenticação)
 * ============================================
 */

app.use(constants.API_PREFIX, require('../src/routes/cosmeticos.js'));
app.use(constants.API_PREFIX, require('../src/routes/farmav1.js'));
app.use(constants.API_PREFIX, require('../src/routes/farmav2.js'));
app.use(constants.API_PREFIX, require('../src/routes/ferrav1.js'));
app.use(constants.API_PREFIX, require('../src/routes/oficina.js'));

/**
 * ============================================
 * TRATAMENTO DE ERROS GLOBAIS
 * ============================================
 */

// 404 - Rota não encontrada
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    status: 'Error',
    message: 'Rota não encontrada.',
    data: null,
  });
});

// Erro genérico (middleware com 4 parâmetros)
app.use((err, req, res, next) => {
  console.error('✗ Erro não tratado:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor.';

  res.status(statusCode).json({
    code: statusCode,
    status: 'Error',
    message,
    data: process.env.NODE_ENV === 'development' ? { error: err.stack } : null,
  });
});

module.exports = app;

