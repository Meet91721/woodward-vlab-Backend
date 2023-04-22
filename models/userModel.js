const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please add user name']
    },
    email: {
        type: String,
        required: [true, 'Please add user email'],
        unique: [true, 'Email already registered']
    },
    password: {
        type: String,
        required: [true, 'Enter password']
    },
},
{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);
