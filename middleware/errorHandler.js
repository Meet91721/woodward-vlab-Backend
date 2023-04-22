const {constants} = require('../constants')
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    switch(statusCode){
        case constants.NOT_FOUND:
            res.json({
                title: 'Data requested not found',
                message: err.message,
                stackTrace: err.stackTrace
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: 'Not authorized',
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        case constants.FORBIDDEN:
            res.json({
                title: 'Access forbidden',
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        case constants.VALIDATION_ERROR:
            res.json({
                title: 'Validation error',
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: 'server error',
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        default:
            res.json({
                title: 'Some unknown error occurred',
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
    }
};

module.exports = errorHandler;