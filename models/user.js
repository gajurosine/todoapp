const mongoose = require('mongoose')
const {ObjectId} = require('mongoose').Types;
const user = mongoose.Schema({
    ip: {
        type: String,
        required: [true, "set id to remeber you"]
    }
})
module.exports = mongoose.model("user", user)