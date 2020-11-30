const User = require('../Models/userModel');
const Data = require('../Models/dataModel');
const Device = require('../Models/deviceModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.sendUserData = catchAsync(async (req, res, next) => {
    // TODO: Melhorar a segurança
    const user = await User.findOne({_id:req.body.user_id, 
                                    username:req.body.username});
    if(!user) return next(new AppError("Invalid info", 404));

    const device = await Device.findOne({
        username: req.body.username,
        user_id: req.body.user_id,
        _id: req.body.device_id,
        name: req.body.device_name,
    })
    console.log(device.color)
    if(!device) return next(new AppError("This device does not exists", 404))
    const newData = await Data.create({
        username: req.body.username,
        user_id: req.body.user_id,
        device_id: req.body.device_id,
        device_name: req.body.device_name,
        device_color: device.color,
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

exports.syncUser = catchAsync(async (req, res, next) => {
    console.log(req.body)
    const user = await User.find({
        _id:req.body.user_id, name:req.body.username
    })
    if(!user) return next(new AppError('Cant find user', 404));
    const device = await Device.create({
        username:req.body.username,
        user_id: req.body.user_id,
        name:req.body.device_name,
        color:req.body.color
    })
    if(!device) return next(new AppError("Cant create device", 409))
    res.status(200).json({
        status:'success',
        data:{
            device
        }
    });
})