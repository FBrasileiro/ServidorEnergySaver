const User = require('../Models/userModel');
const Data = require('../Models/dataModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.updateUser = (req,res)=>{
    res.status(200).json({
        message: "Funcionando"
    });
}

exports.deleteUser = (req,res)=>{
    res.status(200).json({
        message: "Funcionando"
    });
}

exports.getUserData = catchAsync(async (req, res, next)=>{
    const data = await Data.find({ username: req.body.username,
                                    user_id: req.body.user_id })
    res.status(200).json({
        message: data
    });
});
