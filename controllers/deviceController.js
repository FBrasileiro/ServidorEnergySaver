const User = require('../Models/userModel');
const Data = require('../Models/dataModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.sendUserData = catchAsync(async (req, res, next) => {
    // TODO: Melhorar a segurança
    const user = await User.findOne({_id:req.body.user_id, 
                                    name:req.body.username});
    if(!user) return next(new AppError("Invalid info", 404));

    const newData = await Data.create({
        username: req.body.username,
        user_id: req.body.user_id,
        device_id: req.body.device_id,
        data: {
            consume: req.body.data.consume,
            date: Date.now()
        },
    });
    if(!newData) return next(new AppError("Invalid data", 409));
    res.status(201).json({
        status: 'success',
        data: newData,
    })

    next();
});