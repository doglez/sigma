import Config from "../config/Config.js";
import AsyncHandler from "../middleware/AsyncHandler.js";
import User from "../models/User.js";
import ErrorResponse from "../utilis/ErrorResponse.js";
import SendEmails from "../utilis/SendEmails.js";
import crypto from "crypto";

/**
 * @name register
 * @description Register a user
 * @route POST /api/v1/auth/register
 * @access Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const register = AsyncHandler(async (req, res, next) => {
    const {
        collaboratorNumber,
        name,
        lastName,
        department,
        country,
        stateProvince,
        phone,
        email,
        role,
    } = req.body;

    const user = await User.create({
        collaboratorNumber,
        name,
        lastName,
        department,
        country,
        stateProvince,
        phone,
        email,
        role,
    });

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/resetpassword/${resetToken}`;

    const text = `You are receiving this email because you (or another person) have registered you is SIGMA. Please make a PUT request to:\n\n${resetUrl}`;

    try {
        await SendEmails({
            email: user.email,
            subject: "Password reset token",
            text,
        });

        res.status(200).json({
            data: "Email sent",
        });
    } catch (error) {
        console.error(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorResponse(`Email could not be sent`, 500));
    }
});

/**
 * @name login
 * @description Login user
 * @route POST /api/v1/auth/login
 * @access Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const login = AsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
        return next(
            new ErrorResponse(`Please provide an email and password`, 400)
        );
    }

    // Chek for user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorResponse(`Invalid credentials`, 401));
    }

    // Chek if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(new ErrorResponse(`Invalid credentials`, 401));
    }

    sendTokenResponse(user, 200, res);
});

/**
 * @name getMe
 * @description Get own info
 * @route GET /api/v1/auth/me
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const getMe = AsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        data: user,
    });
});

/**
 * @name updateMe
 * @description Update own info
 * @route PUT /api/v1/auth/updateme
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const updateMe = AsyncHandler(async (req, res, next) => {
    const { country, stateProvince, phone } = req.body;

    const user = await User.findByIdAndUpdate(
        req.user.id,
        {
            country,
            stateProvince,
            phone,
        },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        data: user,
    });
});

/**
 * @name logout
 * @description Logout user
 * @route GET /api/v1/auth/logout
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const logout = AsyncHandler((req, res, next) => {
    res.cookie("token", "none", {
        expires: new Date(Date.now() + 10 * 1000),
    });

    res.status(200).json({
        satus: true,
    });
});

/**
 * @name forgotPassword
 * @description Generate a link to recreate a forgotten password
 * @route POST /api/v1/auth/forgotpassword
 * @access Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const forgotPassword = AsyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorResponse(`There is no user with that email`, 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/resetpassword/${resetToken}`;

    const text = `You are receiving this email because you (or someone else) has requested the reset of password. Please make a PUT request to:\n\n${resetUrl}`;

    try {
        await SendEmails({
            email: user.email,
            subject: "Password reset token",
            text,
        });

        res.status(200).json({
            data: "Email sent",
        });
    } catch (error) {
        console.error(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorResponse(`Email could not be sent`, 500));
    }
});

/**
 * @name resetPassword
 * @description Reset a password
 * @route POST /api/v1/auth/resetpassword/:resettoken
 * @access Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const resetPassword = AsyncHandler(async (req, res, next) => {
    // Validate regExp password
    const regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;

    if (!req.body.password) {
        return next(new ErrorResponse("Must enter a password", 400));
    }

    if (!req.body.password.match(regExp)) {
        return next(
            new ErrorResponse(
                "Password must contain at least one number and one special character and must be between 6 and 12 characters",
                400
            )
        );
    }

    // Validate match password with passwordConfirm
    if (req.body.password !== req.body.passwordConfirm) {
        return next(
            new ErrorResponse(
                `Password and Password Confirm must be the same`,
                400
            )
        );
    }

    // Get hashed token
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resettoken)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorResponse(`Invalid token`, 400));
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    const text = `Your password has been updated`;

    try {
        await SendEmails({
            email: user.email,
            subject: "Password Updated",
            text,
        });

        sendTokenResponse(user, 200, res);
    } catch (error) {
        console.error(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorResponse(`Email could not be sent`, 500));
    }
});

/**
 * @name updatePassword
 * @description Update user password
 * @route PUT /api/v1/auth/updatepassword
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const updatePassword = AsyncHandler(async (req, res, next) => {
    // Validate that old password is different with the new password
    if (req.body.currentPassword === req.body.newPassword) {
        return next(
            new ErrorResponse(
                `Current password must be different from the new password`,
                401
            )
        );
    }

    const regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;

    if (!req.body.newPassword) {
        return next(new ErrorResponse("Must enter a password", 400));
    }

    if (!req.body.newPassword.match(regExp)) {
        return next(
            new ErrorResponse(
                "Password must contain at least one number and one special character and must be between 6 and 12 characters",
                400
            )
        );
    }

    // Validate match password with passwordConfirm
    if (req.body.newPassword !== req.body.passwordConfirm) {
        return next(
            new ErrorResponse(
                `Password and Password Confirm must be the same`,
                400
            )
        );
    }

    const user = await User.findById(req.user.id).select("+password");

    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
        return next(new ErrorResponse(`Password is incorrect`, 401));
    }

    user.password = req.body.newPassword;
    await user.save();

    const text = `Your password has been updated`;

    try {
        await SendEmails({
            email: user.email,
            subject: "Password Updated",
            text,
        });
    } catch (error) {
        console.error(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorResponse(`Email could not be sent`, 500));
    }

    sendTokenResponse(user, 200, res);
});

/**
 * @name uploadMyPhoto
 * @description Upload array files
 * @route PUT /api/v1/auth/uploadmyphoto
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const uploadMyPhoto = AsyncHandler(async (req, res, next) => {
    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }

    let files = [];

    if (!req.files.file.length) {
        files = [req.files.file];
    } else {
        files = [...req.files.file];
    }

    if (files.length > 1) {
        return next(new ErrorResponse(`Only accept 1 files maximum`, 400));
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
            return next(new ErrorResponse(`Only supports JPG or PNG`, 400));
        }

        if (file.size > Config.MAX_FILE_UPLOAD) {
            return next(
                new ErrorResponse(
                    `Some file size is more than ${
                        Config.MAX_FILE_UPLOAD / 1000000
                    }MB`,
                    400
                )
            );
        }

        file.name = `${req.user.id}_${file.name}`;

        file.mv(`${Config.FILE_UPLOAD_PATH}/${file.name}`, async (error) => {
            if (error) {
                console.error(error);
                return next(
                    new ErrorResponse("Problems with file upload", 500)
                );
            }
        });
    }

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { photo: files[0].name },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        data: user,
    });
});

/**
 * @name sendTokenResponse
 * @description Get token from model and create cookie
 * @param {*} user
 * @param {*} statusCode
 * @param {*} res
 */
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + Config.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    if (Config.NODE_ENV === "production") {
        options.secure = true;
    }

    res.status(statusCode).cookie("token", token.options).json({
        token,
    });
};
