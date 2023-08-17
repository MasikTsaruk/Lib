const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fav: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        title: String
    }]
})

const User = mongoose.model("User", userSchema)
module.exports = User