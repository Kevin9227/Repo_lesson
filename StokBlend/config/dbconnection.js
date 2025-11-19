const { MongoClient } = require('mongodb');

async function connectToDatabase() {
  const url = process.env.DATABASE_URL ;
  const client = new MongoClient(url);
  const dbName = 'stokblend';
  
  try {
    await client.connect();
 
    const resultado = await client.db(dbName).admin().ping();
     
    return client.db(dbName); // Retorna a instância do banco de dados
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);

    throw error;
  }
}

module.exports = connectToDatabase;
