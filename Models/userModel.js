const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate:{
            validator: function(el){
                return el === this.password;
            },
            message: "Passwords are not the same"
        }
    }
});

userSchema.pre('save', async function(next){ // So roda se a senha foi modificada
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
});

userSchema.methods.isPasswordCorrect = async function(password, hashedPassword){
    return await bcrypt.compare(password, hashedPassword);
}

const User = mongoose.model('Users', userSchema);

module.exports = User;