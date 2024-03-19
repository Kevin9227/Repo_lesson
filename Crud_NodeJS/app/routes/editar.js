module.exports=(app)=>{
    app.post('/editar', (req,res)=>{
        let prod = req.body
        let dbconectar = app.config.dbconnection()
        dbconectar.query(`UPDATE st SET ref='${prod.ref}',design='${prod.design}', preco =${prod.preco}, dataalteracao=CURDATE() WHERE id=${prod.id}`)
        res.redirect('/',)
       // console.log(teste)
    })
}