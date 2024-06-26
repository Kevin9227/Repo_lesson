const jwt = require('jsonwebtoken');


const gera_token = async (req,res)=>{

    if (result.rows.length > 0) {
    const user = result.rows[0];
    const match = await comparePassword(senha, user.pw.trim());
    if (match) {
        const token = jwt.sign({ _id: user.id }, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-*/_!@#$%^&*()");
        await client.query('UPDATE buser SET token=$1 WHERE id=$2', [token, user.id]);
        res.cookie('jwt', token, { maxAge: 6500000, httpOnly: true });
        return res.redirect('/');
    }
}
res.status(401).redirect('/');
}


const validar_token = async (req,res)=>{
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(200).render('index',{user: req.user,routes:''});
        }
        jwt.verify(token, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-*/_!@#$%^&*()", (err, user) => {
            if (err) {
                return res.status(200).redirect('/');
            }
            req.user = user;
            next();
        })
    }

module.exports ={gera_token,validar_token}
