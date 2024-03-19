function alltrim(str) {
    return str.replace(/^\s+|\s+$/g, ' ');
}
module.exports = (app)=>{
    app.post('/criar',(req,res)=>{
        let corpo = req.body
        let dbconectar = app.config.dbconnection()

        try{
             
        if(alltrim(corpo.ref) ===0 ){
            console.log('Valor Vazio')
            return false
        }else{
            dbconectar.query('INSERT INTO st SET ?',corpo,(erro)=>{
                if(!erro){
                    res.redirect('/')
                }else{
                    console.log(erro)
                }
            })
        }
        
        }catch (erro_ocorrido){
            
            console.log(erro_ocorrido)
            return false;
        }
       
    })
}