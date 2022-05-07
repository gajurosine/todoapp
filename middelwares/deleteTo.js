const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secret = "thecoder"
exports.deletes = async(req, res, next) =>{
    const {data, messageId} = req.body;
    const token = req.body.token ? req.body.token : req.params.token;
    try{
        const id = jwt.verify(token, secret);
        const dates = new Date(Date.now());
        var date = dates.getDate().toString();
        date = date.length > 1 ? date : "0" + date;
        var month = dates.getMonth().toString();
        month = month.length > 1 ? month : "0" + month;
        const year = dates.getFullYear().toString();
        const time = `${date}/${month}/${year}`;
        req.body = !data ? id : {id, message:data, date: time, messageId}
        next();
    }catch(e){
        console.log(e)
        res.status(401).json({err: "login please"});
    }
}
exports.todos = async(req, res, next) =>{
    const {time} = !req.body.date ? req.body : req.body.id
    const user = await User.findOne({time});
    if(!user){
        return res.status(400).json({err: "login please"})
    }
    next()
}