const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const login = require('./routes/user');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const url = "mongodb://localhost:27017/todo";
const User = require('./models/user')
mongoose.connect(url, {isUnifiedTopology: true})
.then(()=>{console.log('conection established')})
.catch(err => console.log(err));
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
})
app.use('/', login)
server.listen(PORT, ()=>{console.log(`http://localhost:${port}`)});