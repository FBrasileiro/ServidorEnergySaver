const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const Data = require('../Models/dataModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getUserData = catchAsync(async (req, res, next) => {
    const user = await User.findOne({});
    if(!user) return next(new AppError('There is no user in database', 204));
    const data = await Data.findOne({ user_id:user._id });
    if(!data) res.status(200).json({
                message: {
                    user,
                    }
                });
    else
    res.status(200).json({
        message: {
            user:user,
            data:data
            }
        });
    
})


exports.sendUserData = catchAsync(async (req, res, next) => {
    const newData = await Data.create({
        username: req.body.username,
        user_id: req.body.user_id,
        device_id: req.body.device_id,
        data: req.body.data,
    });
    res.status(201).json({
        status: 'success',
        data: newData,
    })
});