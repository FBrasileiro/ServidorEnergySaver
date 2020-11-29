const User = require('../Models/userModel');
const Data = require('../Models/dataModel');
const Device = require('../Models/deviceModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.updateUser = (req,res)=>{ // TODO
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
    const username = req.query.username
    const user_id = req.query.user_id 
    const user = await User.findOne({name:username, _id:user_id})
    if(!user) return next(new AppError('Cant find user', 404))

    const data = await Data.find({ username, user_id})
    if(!data) return next(new AppError('Invalid Data', 404))
    res.status(200).json({
        message: data
    });
});

exports.getUserSyncedDevices = catchAsync(async (req, res, next) => {
    const user = await User.findOne({
        _id:req.query.user_id, 
        name:req.query.username
    });
    if(!user) return next(new AppError("Invalid info", 404));

    const device = await Device.find({
        user_id:user._id,
        username:user.name,
    })
    
    res.status(200).json({
        synced:{
            devices:device
        }
    });
    
})

exports.getSyncedDeviceData = catchAsync(async (req, res, next) => {
    const user = await User.findOne({_id:req.query.user_id, 
        name:req.query.username});
    if(!user) return next(new AppError("Invalid info", 404));
    var query = {
        user_id:user._id,
        username:user.name,
    }
    req.query.device_id ? query.device_id = req.query.device_id : null
    const device = await Device.find(query)
    const data = await Data.find(query)
    res.status(200).json({
        synced:{
            data:data,
        }
    });
})

exports.getUserInfo = catchAsync(async (req, res, next) => {
    const user = await User.findOne({
        _id:req.query.user_id,
        name:req.query.username
    }).select('-password')

    console.log(user)
    if(!user) return next(new AppError("This user does not exists", 404));
    
    res.status(200).json({
        status:'success',
        data:user
    })
    
});