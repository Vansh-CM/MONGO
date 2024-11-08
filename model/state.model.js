const mongoose = require("mongoose");

const stateSchema = new  mongoose.Schema({
    name: String,
    country : {type : mongoose.Schema.Types.ObjectId , ref : "country"}
})

module.exports = mongoose.model("state" , stateSchema)