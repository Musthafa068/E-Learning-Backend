// const mongoose=require('mongoose')

// const userSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     role:{
        
//     }
// })

// const users=mongoose.model("users",userSchema)

// module.exports=users


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'],
        required: true
    },
    qualification: {
        type: String,
        required: function () {
            return this.role === 'instructor';
        }
    },
    experience: {
        type: Number,
        required: function () {
            return this.role === 'instructor';
        },
        min: 0 // ✅ Allows 0 as a valid experience value
    },
    linkedIn: {
        type: String,
        required: function () {
            return this.role === 'instructor';
        }
    }
});

const user = mongoose.model("user", userSchema);
module.exports = user;
