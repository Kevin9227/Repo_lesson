const connectToDatabase = require('../../config/dbconnection.js');

async function buscarDados(familia, codigo, descricao, dbcollection) {
  const db = await connectToDatabase();
  const collection = db.collection(dbcollection);
  try {
    // Aqui você constrói sua consulta com base nos requisitos
    //console.log(codigo,'/', familia)
    const queryCodigo = (familia, codigo, descricao) => {

      if (codigo !== undefined || codigo) {
        const query = { [`codigo`]: codigo }
        
        return query;
      }
      if (familia !== undefined || familia) {
        const query = { [`familia`]: familia }
        return query;
      }
      if (descricao !== undefined || descricao) {
        const query = { Descricao:{ $regex: descricao} }
        return query;
      }
      if (familia == undefined || codigo == undefined || descricao == undefined) {
        const query = {}
        return { msg: "Sem resultado para mostrar." };
      }
    }
    /* const resultado = await collection.find(
      queryCodigo(familia,codigo)
      ).toArray(); */
    
    const resultado = await collection.find(
      queryCodigo(familia, codigo, descricao)
    ).toArray();

    return await resultado.length == 0 || null ? { msg: "A consulta não retornou nenhum resultado, por favor tente novamente.." } : resultado;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
} 

module.exports = { buscarDados };
