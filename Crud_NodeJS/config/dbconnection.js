const sqlite3 = require('sqlite3').verbose();
const myconnection =()=>{
    
    // Cria uma instância do banco de dados SQLite3
    const db = new sqlite3.Database('caminho_para_o_banco_de_dados.db');
    
    // Faça suas operações no banco de dados aqui
    
    // Fecha a conexão com o banco de dados
   // db.close();
    
}

module.exports = ()=>{
    return myconnection 
}