const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const catchAsync = require('../utils/catchAsync');


exports.signup = catchAsync(async (req ,res, next)=>{
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY, {expiresIn: process.env.JWT_EXPIRES_IN});

    res.status(201).json({
        status: 'success',
        token: token,
        data:{
            user: newUser,
        }
    })
});
exports.login = async (req,res)=>{
    console.log(req.body);
    res.status(200).json({
        "teste":"aaa"
    });
}
