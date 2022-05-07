const User = require('../models/user');
const jwt = require('jsonwebtoken');
exports.login = async(req, res) =>{
    let id;
    $.getJSON('http://ip.jsontest.com/', function(data) {
    id = JSON.stringify(data, null, 2)
   });
   if(id) {
       const user = await User.create({ip: id})
       const token = jwt.sign({id: user.ip}, secret, {expiresIn: "10d"})
       res.status(201).json({token});
   }
}
exports.createTo = async(req, res) => {
    const {message} = req.body;
    if(!message || message === "" ) {
        return res.status(400).json({err: "Enter your message"});
    }
    const to = require('')
}