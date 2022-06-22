import jwt from "jsonwebtoken";
import Config from "../config/Config.js";
import User from "../models/User.js";
import ErrorResponse from "../utilis/ErrorResponse.js";
import AsyncHandler from "./AsyncHandler.js";

/**
 * @name protect
 * @description Protect the route if user don't has permissions
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns route
 */
export const protect = AsyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1]; // Set token from Bearer token in header
    } else if (req.cookies.token) {
        // Use this if you use Cookie
        token = req.cookies.token; // Set token from cookie
    }

    if (!token) {
        return next(
            new ErrorResponse("Not autorized to access this route", 401)
        );
    }

    try {
        // Verify token
        const decode = jwt.verify(token, Config.JWT_SECRET);
        req.user = await User.findById(decode.id);
        next();
    } catch (error) {
        return next(
            new ErrorResponse("Not autorized to access this route", 401)
        );
    }
});

/**
 * @name authorize
 * @description Authorize the access if user has permissions
 * @param {...any} roles
 * @returns next
 */
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    `User role ${req.user.role} is not autorized to access this route`,
                    403
                )
            );
        }
        next();
    };
};
