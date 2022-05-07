const axios = require('axios').default;
const {io} = require('socket.io-client');
const instance = axios.create({
    baseURL: 'http://localhost:5000'
})
const socket_url = "http://localhost:5000"
export const socket = io(socket_url);
export default instance;