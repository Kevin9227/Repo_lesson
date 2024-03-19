const sqlite3 = require('sqlite3').verbose();

// Cria uma instância do banco de dados SQLite3
const db = new sqlite3.Database('database.db');

// Cria a tabela "stock" com as colunas especificadas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS stock (
      id INTEGER PRIMARY KEY,
      ref_design TEXT,
      preco REAL,
      datacriado TEXT,
      dataalteracao TEXT
    )
  `);
});
