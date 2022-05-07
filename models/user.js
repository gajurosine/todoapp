const mongoose = require('mongoose')
const user = mongoose.Schema({
    id: {
        type: Number,
        required: [true, "set id to remeber you"]
    }
})
module.exports = mongoose.model("user", user)