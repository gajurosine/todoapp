const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const login = require('./routes/user');
const Message = require('./models/message')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const url = "mongodb://localhost:27017/todo";
const User = require('./models/user');
const PORT = process.env.PORT || 5000;
const mongo = require('mongodb').MongoClient;
mongo.connect(url, ()=>{console.log('connected')})
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
})
app.use('/', login);
const get = (room) =>{
    const sortTod = Message.aggregate([
        {$match: {ip: room}}
    ])
    return sortTod
}
io.on('connection', (socket)=>{
    socket.on('join-room', (room)=>{
        socket.join(room);
        let todos = get(room);
        io.to(room).emit('todo', todos);
    })
    socket.on('createTodo', async(todo)=>{
        const {message, ip} = todo;
        if(!message || message === "" ) {
            return res.status(400).json({err: "Enter your message"});
        }
        const dates = new Date(Date.now());
        var date = dates.getDate().toString();
        date = date.length > 1 ? date : "0" + date;
        var month = dates.getMonth().toString();
        month = month.length > 1 ? month : "0" + month;
        const year = dates.getFullYear().toString();
        const time = `${date}/${month}/${year}`;
        const hello = await Message.create({ip, message, date: time});
        io.to(ip).emit("todo", hello)
    } )
})
server.listen(PORT, ()=>{console.log(`http://localhost:${PORT}`)});