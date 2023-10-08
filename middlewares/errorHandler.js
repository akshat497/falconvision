const { ValidationError } = require("sequelize");
const { DEBUG_MODE } = require("../config");
const CustomErrorHandler = require('../services/CustomErrorHandler');




module.exports = errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let data = {
        message: "Internal Server Error",
        ...(DEBUG_MODE === "true" && { orignalError: err.massage })

    }

    if (err instanceof ValidationError) {
        statusCode = 422;
        data = {
            massage: err.errors[0].message
        }
    }
    if (err instanceof CustomErrorHandler) {
        statusCode = err.status;
        data = {
            massage: err.message
        }
    }


    return res.status(statusCode).json(data);
}

