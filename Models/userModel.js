const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, 'The user must enter a name'],
    },
    email:  {
        type: String,
        required: [true, 'The user must enter an email'],
        unique: true,
        lowercase: true,
        validate: [validator.default.isEmail, 'Please provide a valid email'],
    },
    password:  {
        type: String,
        required: [true, 'The user must enter a password'],
        minlength: 8,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        minlength: 8,
    }
});
const User = mongoose.model('Users', userSchema);

module.exports = User;