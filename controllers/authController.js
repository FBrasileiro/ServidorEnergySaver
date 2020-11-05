const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const User = require('../Models/userModel');


exports.signup = catchAsync(async (req ,res, next)=>{
    const newUser = await User.create(req.body);

    res.status(201).json({
        status: 'success',
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
