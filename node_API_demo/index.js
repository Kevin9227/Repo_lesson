
const express = require('express');
const app = express()
const porta = 4567

const fs = require('fs');

// Lê o arquivo data.json
fs.readFile('dados.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Faz o parse do JSON
  const produtos = JSON.parse(data);
  const lispro =[produtos]
  app.get("/produtos",(req,res)=>{
    res.json(produtos)
  })
  app.get("/produtos/:id",(req,res)=>{
    res.json(produtos[req.params.id])
})
app.get("/familia/:id",(req,res)=>{
  res.json(produtos[req.params.id])
})
  // Exibe o conteúdo do arquivo JSON
 // console.log(jsonData);
});

const carros =[
    {nome:"Carina ", marca:"Toyota"},
    {nome:"i10  ", marca:"Nisan"},
]
app.get("/",(req,res)=>{
    res.send("TESTE")
    //res.json(carros)
})

app.get("/carro/:id",(req,res)=>{
    res.json(carros[parseInt(req.params.id)-1])
})

app.listen(porta,() =>{
    console.log(`Ouvindo a Porta ${porta}`)
} )

const teste= [{1:{}}]

// CRUD  = CREATE, READ , UPDATE
// HTTP => , GET, PUT/PATCH, DELETE