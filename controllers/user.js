const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Message = require('../models/message');
const secret = "thecoder"
const sort = (message) =>{
    return message?.sort((a, b) =>{
        let date1 = a._id.split('/');
        let date2 = b._id.split('/');
        date1 = date1[2]+date1[1]+date1[0];
        date2 = date2[2]+date2[1]+date2[0];
        return date1 > date2 ? 1 : -1;
    })
}
const get = async(time) =>{
    const roomMess = await Message.aggregate([
        {$match: {user: time}},
        {$group: {_id: '$date', todos: {$push: '$$ROOT'}}}
    ])
    return await sort(roomMess);
};
exports.login = async(req, res) =>{
    try{
        const time = new Date().getTime()
        const user = User.create({time});
        const token = jwt.sign({time}, secret, {expiresIn: '1y'})
        res.status(201).json({token});
    }catch(err){
        res.status(500).json({err: "something went wrong"});
    }
}
exports.defaults = async(req, res) =>{
    const {time} = req.body;
    const todo = await get(time);
    res.status(200).json(todo)
}
exports.deleted = async(req, res) =>{
    try{
        const {messageId, id} = req.body;
        await Message.findByIdAndDelete(messageId);
        const todo = await get(id.time);
        res.status(200).json(todo);
    }catch(e){
        console.log(e)
    }
}
exports.create = async(req, res) =>{
    try{
        const {message, id, date} = req.body;
        let user = id.time;
        await Message.create({user, date, message});
        const todos = await get(user);
        res.status(200).json(todos)
    }catch(err){
        console.log(err)
    }
}
exports.update = async(req, res) =>{
    try{
        const {messageId, message, id} = req.body;
        await Message.findOneAndUpdate({messageId}, {message});
        const todo = await get(id.time);
        res.status(200).json(todo)
    }catch(e){
        console.log(e)
    }
}