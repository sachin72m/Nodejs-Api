const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    username : String,
    name : String,
    phone : Number,
    password : String
})

module.exports = mongoose.model('Users' , UserSchema);