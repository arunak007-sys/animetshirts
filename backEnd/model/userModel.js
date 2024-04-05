const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    confirmPassword : {
        type : String,
        required : true,
    },
    cart : 
        {
            type : Array,
            required : false,
        },
    
    wishlist : 
        {
            type : Array,
            required : false,
        }
    
})

const User = mongoose.model('User',userSchema)

module.exports = User