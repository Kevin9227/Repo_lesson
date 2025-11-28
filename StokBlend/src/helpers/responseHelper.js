/**
 * Helpers para formatar respostas da API
 */

const { HTTP_STATUS, MESSAGES } = require('../../config/constants');


/**
 * Formata uma resposta de sucesso
 */
const successResponse = (code = HTTP_STATUS.OK, message = 'Sucesso', data = null) => {
  return {
    code,
    status: 'Success',
    message,
    data,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Formata uma resposta de erro
 */
const errorResponse = (code = HTTP_STATUS.INTERNAL_ERROR, message = MESSAGES.INTERNAL_ERROR, data = null) => {
  return {
    code,
    status: 'Error',
    message,
    data,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Respostas pré-definidas comuns
 */
const responses = {
  notFound: (message = MESSAGES.NOT_FOUND) =>
    errorResponse(HTTP_STATUS.NOT_FOUND, message),

  unauthorized: (message = MESSAGES.INVALID_TOKEN) =>
    errorResponse(HTTP_STATUS.UNAUTHORIZED, message),

  forbidden: (message = 'Acesso proibido.') =>
    errorResponse(HTTP_STATUS.FORBIDDEN, message),

  rateLimitExceeded: (retryAfter = null) =>
    errorResponse(
      HTTP_STATUS.TOO_MANY_REQUESTS,
      MESSAGES.RATE_LIMIT_EXCEEDED,
      retryAfter ? { retryAfter } : null
    ),

  badRequest: (message = MESSAGES.INVALID_PARAMS) =>
    errorResponse(HTTP_STATUS.BAD_REQUEST, message),

  databaseError: (message = MESSAGES.DATABASE_ERROR) =>
    errorResponse(HTTP_STATUS.INTERNAL_ERROR, message),

  noResults: (message = MESSAGES.NO_RESULTS) =>
    successResponse(HTTP_STATUS.OK, message, []),

  internalError: (message = MESSAGES.INTERNAL_ERROR) =>
    errorResponse(HTTP_STATUS.INTERNAL_ERROR, message),

  serviceUnavailable: (message = 'Serviço indisponível.') =>
    errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, message),
};

/**
 * Valida se os parâmetros obrigatórios estão presentes
 */
const validateRequiredParams = (data, requiredFields) => {
  const missing = requiredFields.filter(field => !data[field]);
  return {
    isValid: missing.length === 0,
    missing,
  };
};

/**
 * Sanitiza query para proteção contra injections
 */
const sanitizeQuery = (query) => {
  if (typeof query !== 'string') return query;
  
  return query
    .replace(/[<>]/g, '') // Remove caracteres perigosos
    .substring(0, 500) // Limita tamanho
    .trim();
};

module.exports = {
  successResponse,
  errorResponse,
  responses,
  validateRequiredParams,
  sanitizeQuery,
  HTTP_STATUS,
  MESSAGES,
};
