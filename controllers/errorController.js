const AppError = require("../utils/appError");

const handleDuplicateFieldDB = error => {
    let message = error.message.match(/(["'])(\\?.)*?\1/);
    message =  `Duplicated value: ${message[0]}, please use another one`;
    return new AppError(message, 400);

}

const handleJwtError = () => new AppError("Invalid token", 401);
const handleJwtExpiredError = () => new AppError("Token Expired", 401);

const sendErrorDev = (err, res) => { 
    // Usado apenas para desenvolvimento
    // Vai enviar todos os detalhes do erro
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

const sendErrorProd = (err, res) => {
    // Erro conhecido. Vai enviar para o usuario
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    else{ // Erro Desconhecido. Nao vai leakar detalhes pro usuario
        res.status(500).json({ // Envia mensagem genérica
            status: 'error',
            message: 'Something went wrong'
        })
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'dev'){
        sendErrorDev(err, res);
    }
    else if(process.env.NODE_ENV === 'prod'){
        if(err.code === 11000) err = handleDuplicateFieldDB(err);
        if(err.name === "JsonWebTokenError") err = handleJwtError();
        if(err.name === "TokenExpiredError") err = handleJwtExpiredError();
        sendErrorProd(err, res);
    }


    
}