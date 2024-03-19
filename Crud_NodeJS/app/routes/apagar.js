module.exports =(app)=>{
    app.post('/apagar',(req,res)=>{
        let corpo = req.body 
        let dbconectar = app.config.dbconnection()
        dbconectar.query(`DELETE FROM st WHERE id=${corpo.id}`)
        res.redirect('/')
    })
}