const User = require('../models/user')
exports.login = async(req, res) =>{
    let id;
    $.getJSON('http://ip.jsontest.com/', function(data) {
    id = JSON.stringify(data, null, 2)
   });
   
}