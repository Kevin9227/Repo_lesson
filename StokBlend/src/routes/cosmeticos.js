
const express = require('express')
const {buscarDados} = require('../models/mdconsulta')
const rotas = express.Router()


const u_stamp =(inicias)=>{
  let dataactual = new Date()
  let dia = dataactual.getDay() <=9 ? '0'+ dataactual.getDay() :dataactual.getDay() ;
  let mes = dataactual.getMonth()
  let ano = dataactual.getYear()
  let dataFormatada = `${dia}${mes}${ano}`
  let valor = inicias+ dataFormatada + Math.floor(Math.random() * 10000000)
  return valor
}

rotas.get('/cosmeticos', async(req,res)=>{
    try {
    const dados = await buscarDados(req.body.familia,req.body.codigo,req.body.descricao,'cosmeticos');
    res.send(dados);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar dados no servidor..' });
  }
    })

module.exports = rotas