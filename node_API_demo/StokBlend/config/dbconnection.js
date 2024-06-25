const { MongoClient } = require('mongodb');

async function connectToDatabase() {
  const url = process.env.DATABASE_URL ;
  const client = new MongoClient(url);
  
  try {
    await client.connect();
    console.log('Conectado ao banco de dados');
    return client.db(); // Retorna a instância do banco de dados
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
}

module.exports = connectToDatabase;
