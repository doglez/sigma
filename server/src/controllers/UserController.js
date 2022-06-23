import AsyncHandler from "../middleware/AsyncHandler.js";
import User from "../models/User.js";
import ErrorResponse from "../utilis/ErrorResponse.js";
import SendEmails from "../utilis/SendEmails.js";

/**
 * @name getUsers
 * @description Get all users
 * @route GET /api/v1/users
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const getUsers = AsyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

/**
 * @name showUser
 * @description Get one user
 * @route GET /api/v1/users/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const showUser = AsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorResponse(`User not found with id ${req.params.id}`, 400)
        );
    }

    res.status(200).json({
        success: true,
        data: user,
    });
});

/**
 * @name createUser
 * @description Create one user
 * @route POST /api/v1/users
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const createUser = AsyncHandler(async (req, res, next) => {
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
            success: true,
            data: user,
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
 * @name updateUser
 * @description Update one user
 * @route PUT /api/v1/users/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const updateUser = AsyncHandler(async (req, res, next) => {
    const {
        name,
        lastName,
        department,
        country,
        stateProvince,
        phone,
        email,
        role,
    } = req.body;

    let user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
        );
    }

    user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name,
            lastName,
            department,
            country,
            stateProvince,
            phone,
            email,
            role,
        },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        success: true,
        data: user,
    });
});

/**
 * @name deleteUser
 * @description Delete one user
 * @route DELETE /api/v1/users/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const deleteUser = AsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
        );
    }

    await user.remove();

    res.status(200).json({
        success: true,
        data: `User ${user.email} was deleted`,
    });
});
