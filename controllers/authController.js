const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id => jwt.sign({ id }, process.env.JWT_KEY, {expiresIn: process.env.JWT_EXPIRES_IN});

exports.signup = catchAsync(async (req ,res, next)=>{
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token: token,
        data:{
            user: newUser,
        }
    })
});
exports.login = async (req,res, next)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return next(new AppError("Please provide email and password", 400));
    }
    const user = await User.findOne({ email }).select('+password');

    if(!user || !(await user.isPasswordCorrect(password, user.password))){
        return next(new AppError("Incorrect email or password", 401));
    }

    const token = signToken(user._id);
    
    res.status(200).json({
        status: 'sucess',
        token: token
    });

}

exports.protect = catchAsync(async (req, res, next)=>{

    let token;
    if(req.headers.authorization){
        token = req.headers.authorization;
    }

    if(!token){
        return next(new AppError("You are not logged in", 401));
    }

    const decodedJWT = await promisify(jwt.verify)(token, process.env.JWT_KEY); // verifica se o token não foi modificado

    const user = await User.findById(decodedJWT.id);
    if(!user) return next(new AppError('The user does no longer exists', 401));
    if(user.changedPasswordAfter(decodedJWT.iat)) return next(new AppError("User recently changed password"));

    req.user = user;
    next(); // garante acesso a rotas protegidas
})