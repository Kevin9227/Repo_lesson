
const express = require('express')
const {buscarDados} = require('../models/mdconsulta')
const rotas = express.Router()

rotas.get('/ferramentasv1', async(req,res)=>{
    try {
const dados = await buscarDados(req.body.familia,req.body.codigo,req.body.descricao,'ferramentasv1');
res.send(dados);
} catch (error) {
res.status(500).json({ message: 'Erro ao buscar dados na db..' });
}
})

module.exports=rotas 