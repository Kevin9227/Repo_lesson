const fs = require('fs');
const path = require('path');

//Carregar os JSON com os tokens válidos
 const tokensPath = path.join('./', 'tokens.json');
 console.log('Caminho do arquivo de tokens:', tokensPath);

 const tokenDB = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
  

const validarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    console.log('Token recebido no cabeçalho Authorization:', token);
    if (!token) {   
        return res.status(401).json({
            code: 401,
            status: "Error",
            message: "Token de autenticação não fornecido.",
            data: null,
        });

    }

    // Aqui você pode adicionar a lógica para validar o token
    // Por exemplo, verificar se o token é válido, não expirou, etc.
    const tokenValido = true; // Substitua isso pela lógica real de validação     
    
    const tokenRecebido = token.trim();
    const tokenEncontrado = tokenDB.listaDeToken.find(t => t.token === tokenRecebido);

    if (!tokenEncontrado) {
        return res.status(403).json({
            code: 403,  
            status: "Error",
            message: "Token de autenticação inválido.",
            data: null,
        });
    }   

    //Capturar o IP do cliente
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    req.token = tokenRecebido;
    req.ipCliente = ip;
    console.log(`Token válido recebido: ${tokenRecebido} do IP: ${ip}`);

    next(); // Token válido, prossiga para o próximo middleware ou rota


}

module.exports = {validarToken};