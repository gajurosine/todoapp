const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Message = require('../models/message')
exports.login = async(req, res) =>{
    try{
    let id;
    $.getJSON('http://ip.jsontest.com/', function(data) {
    id = JSON.stringify(data, null, 2)
   });
   if(id) {
       const user = await User.create({ip: id})
       const token = jwt.sign({id: user.ip}, secret, {expiresIn: "10d"})
       res.status(201).json({token});
   }
}catch(e){

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
        const ip = req.body;
        await Message.findOneAndUpdate({ip}, {})
    }catch(e){
        
    }
}