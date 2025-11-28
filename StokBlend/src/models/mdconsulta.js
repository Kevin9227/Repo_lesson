const connectToDatabase = require('../../config/dbconnection.js');
const { sanitizeQuery, MESSAGES } = require('../helpers/responseHelper');

/**
 * Constrói query segura com base nos parâmetros fornecidos
 */
const buildQuery = (familia, codigo, descricao) => {
  const query = {};

  // Valida e adiciona familia
  if (familia !== undefined && familia !== '' && familia !== null) {
    query.familia = sanitizeQuery(familia);
  }

  // Valida e adiciona codigo
  if (codigo !== undefined && codigo !== '' && codigo !== null) {
    query.codigo = sanitizeQuery(String(codigo));
  }

  // Valida e adiciona descricao com regex seguro
  if (descricao !== undefined && descricao !== '' && descricao !== null) {
    const sanitized = sanitizeQuery(descricao);
    query.Descricao = { $regex: sanitized, $options: 'i' }; // Case-insensitive
  }

  return query;
};

/**
 * Busca dados no banco com tratamento de erros robusto
 */
async function buscarDados(familia, codigo, descricao, dbcollection) {
  let db = null;

  try {
    // Valida parâmetros de entrada
    if (!dbcollection || typeof dbcollection !== 'string') {
      throw new Error('Collection inválida');
    }

    // Conecta ao banco
    db = await connectToDatabase();

    if (!db) {
      throw new Error('Falha ao conectar ao banco de dados');
    }

    const collection = db.collection(dbcollection);

    // Constrói query segura
    const query = buildQuery(familia, codigo, descricao);

    console.log(`📊 Consultando ${dbcollection}:`, JSON.stringify(query));

    // Executa consulta com timeout e limite de resultados
    const resultado = await collection
      .find(query)
      .limit(1000) // Proteção contra queries grandes
      .toArray();

    // Retorna resultados ou mensagem de vazio
    if (!resultado || resultado.length === 0) {
      console.log(`⚠ Nenhum resultado encontrado para a consulta:`, query);
      return {
        code: 200,
        status: 'Success',
        message: MESSAGES.NO_RESULTS,
        data: [],
      };
    }

    console.log(`✓ ${resultado.length} resultado(s) encontrado(s)`);

    return {
      code: 200,
      status: 'Success',
      message: 'Consulta realizada com sucesso',
      data: resultado,
    };
  } catch (error) {
    console.error('✗ Erro ao buscar dados:', error.message);

    // Retorna erro estruturado
    return {
      code: 500,
      status: 'Error',
      message: MESSAGES.DATABASE_ERROR,
      data: null,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    };
  }
}

module.exports = { buscarDados, buildQuery };
