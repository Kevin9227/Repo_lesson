module.exports=(app)=>{

    

    app.get('/', (req,res)=>{

        let dbconectar = app.config.dbconnection();
        dbconectar.query('select * from st ORDER BY st.design', (erro, resultado)=>{
            res.render('index', {produtos: resultado })
        })
        
    })
}