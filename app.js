const express = require('express');
const morgan = require('morgan');

// Router
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

// Error Handling
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
if(process.env.NODE_ENV === 'dev') app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);


app.all('*', (req, res, next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;