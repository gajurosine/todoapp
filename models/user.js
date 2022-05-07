const mongoose = require('mongoose')
const user = mongoose.Schema({
    ip: {
        type: Number,
        required: [true, "set id to remeber you"]
    }
})
module.exports = mongoose.model("user", user)