const mysql = require('mysql');
const myconnection =()=>{
    //console.log('connection feita com sucesso')
    return mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'sa123',
    port:'3309',
    database:'crud'
})
}

module.exports = ()=>{
    return myconnection 
}