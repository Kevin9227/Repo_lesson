const app = require('./config/server.js');
const dbconectar = require('./config/dbconnection.js');
const constants = require('./config/constants.js');

/**
 * ============================================
 * INICIALIZAÇÃO DO SERVIDOR
 * ============================================
 */

// Inicia servidor
const servidor = app.listen(constants.PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║          🚀 STOKBLEND API RODANDO         ║
╠════════════════════════════════════════════╣
║ Porta: ${constants.PORT}
║ Ambiente: ${constants.NODE_ENV}
║ Taxa Limite IP: ${constants.RATE_LIMIT.IP_MAX_REQUESTS} req/min
║ Taxa Limite Token: ${constants.RATE_LIMIT.TOKEN_MAX_REQUESTS} req/min
║ Timeout: ${constants.REQUEST_TIMEOUT}ms
╚════════════════════════════════════════════╝
  `);
});

/**
 * ============================================
 * TRATAMENTO DE ERROS NÃO CAPTURADOS
 * ============================================
 */

// Erro não tratado em promessas
process.on('unhandledRejection', (reason, promise) => {
  console.error('✗ Promise rejection não tratada:', reason);
});

// Erro crítico não capturado
process.on('uncaughtException', (error) => {
  console.error('✗ Exceção não capturada:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('⏹ Sinal SIGTERM recebido. Encerrando servidor...');
  servidor.close(() => {
    console.log('✓ Servidor encerrado com sucesso');
    process.exit(0);
  });
});

module.exports = app;



