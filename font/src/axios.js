const axios = require('axios');
const {io} = require('socket.io-client');
const instance = axios.default.create({
    baseURL: "http://localhost:5000"
})
const socket_url = "http://localhost:5000"
export const socket = io(socket_url);
export default instance;