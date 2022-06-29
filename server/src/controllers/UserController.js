import Config from "../config/Config.js";
import AsyncHandler from "../middleware/AsyncHandler.js";
import Department from "../models/Department.js";
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

    if (!(await Department.findById(department))) {
        return next(
            new ErrorResponse(`Department not found with id of ${department}`)
        );
    }

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
        data: `User ${user.email} was deleted`,
    });
});

/**
 * @name uploadPhoto
 * @description Upload array files
 * @route PUT /api/v1/users/uploadphoto/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const uploadPhoto = AsyncHandler(async (req, res, next) => {
    let user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorResponse(`User not found`, 400));
    }

    if (
        user.id !== req.user.id &&
        req.user.role !== "super-admin" &&
        req.user.role !== "admin" &&
        req.user.role !== "chief"
    ) {
        return next(new ErrorResponse(`User is not authorized`, 400));
    }

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

        file.name = `${user.id}_${user.name}${user.lastName}.${
            file.mimetype.split("/")[1]
        }`;

        file.mv(`${Config.FILE_UPLOAD_PATH}/${file.name}`, async (error) => {
            if (error) {
                console.error(error);
                return next(
                    new ErrorResponse("Problems with file upload", 500)
                );
            }
        });
    }

    user = await User.findByIdAndUpdate(
        req.params.id,
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
