const express = require('express');
const { buscarDados } = require('../models/mdconsulta');
const { responses } = require('../helpers/responseHelper');

const rotas = express.Router();

/**
 * GET /cosmeticos
 * Busca produtos de cosméticos por família, código ou descrição
 * Query params: familia, codigo, descricao
 */
rotas.get('/cosmeticos', async (req, res, next) => {
  try {
    const { familia, codigo, descricao } = req.query;

    // Log da requisição
    console.log('📥 Requisição GET /cosmeticos', {
      ip: req.ipCliente,
      token: req.token?.substring(0, 10) + '...',
      params: { familia, codigo, descricao },
    });

    // Busca dados com tratamento integrado
    const resultado = await buscarDados(familia, codigo, descricao, 'cosmeticos');

    // Retorna resultado (já está estruturado no modelo)
    res.status(resultado.code).json(resultado);
  } catch (error) {
    console.error('✗ Erro na rota /cosmeticos:', error.message);

    // Passa para middleware de erro global
    next(error);
  }
});

module.exports = rotas;
