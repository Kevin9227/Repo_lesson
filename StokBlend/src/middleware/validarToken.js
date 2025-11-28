const fs = require('fs');
const path = require('path');

/**
 * Carrega e valida o arquivo de tokens na inicialização
 */
let tokenDB = null;

const initializeTokenDB = () => {
  try {
    const tokensPath = path.join(__dirname, '../../tokens.json');
    const rawData = fs.readFileSync(tokensPath, 'utf8');
    tokenDB = JSON.parse(rawData);

    // Valida estrutura
    if (!tokenDB.listaDeToken || !Array.isArray(tokenDB.listaDeToken)) {
      throw new Error('Estrutura de tokens.json inválida');
    }

    console.log(`✓ Base de tokens carregada com sucesso (${tokenDB.listaDeToken.length} tokens)`);
  } catch (error) {
    console.error('✗ Erro ao carregar tokens:', error.message);
    process.exit(1);
  }
};

// Inicializa na primeira execução
initializeTokenDB();

/**
 * Valida token no cabeçalho Authorization
 */
const validarToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    // Verifica se token foi fornecido
    if (!authHeader) {
      return res.status(401).json({
        code: 401,
        status: 'Error',
        message: 'Token de autenticação não fornecido.',
        data: null,
      });
    }

    const tokenRecebido = authHeader.trim();

    // Valida formato mínimo
    if (tokenRecebido.length < 5) {
      return res.status(401).json({
        code: 401,
        status: 'Error',
        message: 'Formato de token inválido.',
        data: null,
      });
    }

    // Busca token na base de dados
    const tokenEncontrado = tokenDB.listaDeToken.find(
      t => t.token === tokenRecebido
    );

    if (!tokenEncontrado) {
      console.warn(`⚠ Tentativa de acesso com token inválido: ${tokenRecebido.substring(0, 10)}...`);
      return res.status(403).json({
        code: 403,
        status: 'Error',
        message: 'Token de autenticação inválido.',
        data: null,
      });
    }

    // Captura IP do cliente (suporta proxies)
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 
               req.socket.remoteAddress || 
               'DESCONHECIDO';

    // Adiciona informações ao request para uso posterior
    req.token = tokenRecebido;
    req.ipCliente = ip;

    console.log(`✓ Token válido: ${tokenRecebido.substring(0, 10)}... | IP: ${ip}`);

    next();
  } catch (error) {
    console.error('✗ Erro ao validar token:', error.message);
    return res.status(500).json({
      code: 500,
      status: 'Error',
      message: 'Erro ao validar autenticação.',
      data: null,
    });
  }
};

module.exports = { validarToken, initializeTokenDB };