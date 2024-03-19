const express = require('express');
const app = express()
const consign  =require('consign')
const bodyparser = require('body-parser')
const caminho = require('path')



app.use(express.static(caminho.join(__dirname,'../public/' ))) // Definir o local dos arquivos estaticos como CSS,JS etc..
app.set('views', 'app/views') // Definir o caminho das visualizações padrão
app.set('view engine','ejs') // Definir o tipo de tecnologia a usar no fronte , pode ser HTML, RECT ETC

app.use(bodyparser.urlencoded({extended:true})) // Definir o bodyParser para verificar todas as partes do projecto


//Difinir as rotas de pastas e mapeamento dos arquivos
consign()
.include('app/routes')
.then('config/dbconnection.js')
.then('app/models')

.into(app)


module.exports=(app);