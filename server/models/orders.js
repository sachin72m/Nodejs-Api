const mongoose = require("mongoose")

const OrderSchema = mongoose.Schema({
    username : String,
    sub_total : Number,
    phone : String,
    name : String
})

module.exports = mongoose.model('Orders' , OrderSchema);