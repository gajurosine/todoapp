const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Message = require('../models/message')
exports.login = async(req, res) =>{
    try{
       const user = await User.create({ip: '192.168'});
       const token = jwt.sign({id: user.ip}, secret, {expiresIn: "10d"})
       res.status(201).json({token});
}catch(e){
console.log(e)
}
}
exports.delete = async(req, res) =>{
    try{
        const ip = req.body;
        await Message.findOneAndDelete({ip})
    }catch(e){
        
    }
}
exports.update = async(req, res) =>{
    try{
        const {ip, message} = req.body;
        await Message.findOneAndUpdate({ip}, {message})
    }catch(e){
        
    }
}