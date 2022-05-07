const jwt = require('jsonwebtoken')
exports.delete = async(req, res, next) =>{
    const {token} = req.body;
    try{
        const token = jwt.verify(token, secret);
        req.body = token
        next();
    }catch(e){
        res.status(401).json({err: "login please"})
    }
}
exports.update =async(req, res, next) =>{
    try{

    }catch(e){
        cn
    }
}