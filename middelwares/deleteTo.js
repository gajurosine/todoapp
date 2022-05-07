const jwt = require('jsonwebtoken')
exports.delete = async(req, res, next) =>{
    const {token, data} = req.body;
    try{
        const token = jwt.verify(token, secret);
        req.body = {token, message: data}
        next();
    }catch(e){
        res.status(401).json({err: "login please"})
    }
}