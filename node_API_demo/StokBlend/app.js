const app = require('./config/server.js')
const dbconectar = require('./config/dbconnection.js')
const express = require('express')
const rotas = express.Router()

const PORTA = process.env.PORT || 3500

app.use('/api/stokblend',require('./src/routes/cosmeticos.js'))
app.use('/api/stokblend',require('./src/routes/farmav1.js'))
app.use('/api/stokblend',require('./src/routes/farmav2.js'))
app.use('/api/stokblend',require('./src/routes/ferrav1.js')) 
app.use('/api/stokblend',require('./src/routes/oficina.js')) 

dbconectar.Promisse = global.Promise

app.use((_req,res)=>{
    res.status(404).json({
        code:404,
        status:"Error",
        message:"Rota não encontrada.",
        data:null
    })
     
})


 app.listen (PORTA,
        console.log(`Servidor rodando na porta ${PORTA}`)
    )


