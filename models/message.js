const mongoose = require('mongoose')
const message = mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    message: {
        type: String,
        requried: true
    },
    date: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("todo", message)