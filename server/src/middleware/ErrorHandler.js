import Config from "../config/Config.js";
import ErrorResponse from "../utilis/ErrorResponse.js";

/**
 * @name errorHandler
 * @description Handle the errors from the Data Base data
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response JSon
 */
const ErrorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log to console for dev
    if (Config.NODE_ENV === "development") {
        console.log(err);
    }

    let message;
    switch (err.name) {
        case "CastError":
            // Mongoose bad ObjectID
            message = "Resource not found";
            error = new ErrorResponse(message, 404);
            break;

        case "MongoServerError":
            // Mongoose duplicate Key
            message = `Duplicate value ${Object.values(err.keyValue)}`;
            error = new ErrorResponse(message, 404);
            break;

        case "ValidationError":
            // Mongoose validation error
            message = Object.values(err.errors).map((value) => value.message);
            error = new ErrorResponse(message, 404);
            break;

        default:
            break;
    }

    return res.status(error.statusCode || 500).json({
        error: error.message || "Server Error",
    });
};

export default ErrorHandler;
