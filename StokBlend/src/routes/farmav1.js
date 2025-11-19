
const express = require('express')
const {validarToken} = require('../middleware/validarToken')
const {buscarDados} = require('../models/mdconsulta')
const rotas = express.Router()

rotas.get('/farmaciav1',validarToken, async(req,res)=>{
    try {
const dados = await buscarDados(req.query.familia,req.query.codigo,req.query.descricao,'farmaciav1');
res.send(dados);
} catch (error) {
res.status(500).json({ message: 'Erro ao buscar dados na db..' });
}
})

module.exports=rotas