const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const {login} = require('./routes/login')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', login)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
})
server.listen(PORT, ()=>{console.log(`http://localhost:${port}`)});