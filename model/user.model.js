const mongoose =  require('mongoose')


const userSchema = new mongoose.Schema({
    name :  String,
    email:{
        type:String,
        unique : true
    },
    password : String,
    image_url : String

})

module.exports = mongoose.model('user', userSchema);