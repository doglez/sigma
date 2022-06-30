import Config from "../config/Config.js";
import AsyncHandler from "../middleware/AsyncHandler.js";
import Provider from "../models/Provider.js";
import ErrorResponse from "../utilis/ErrorResponse.js";

/**
 * @name getProviders
 * @description Get all Providers
 * @route GET /api/v1/providers
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const getProviders = AsyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

/**
 * @name showProvider
 * @description Get one Provider
 * @route GET /api/v1/providers/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const showProvider = AsyncHandler(async (req, res, next) => {
    const provider = await Provider.findById(req.params.id);

    if (!provider) {
        return next(
            new ErrorResponse(
                `Provider not found with id ${req.params.id}`,
                400
            )
        );
    }

    res.status(200).json({
        data: provider,
    });
});

/**
 * @name createProvider
 * @description Create or updatea Provider
 * @route PUT /api/v1/providers
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const createProvider = AsyncHandler(async (req, res, next) => {
    const { ein, name, country, phone, email, website } = req.body;

    const provider = await Provider.create({
        ein,
        name,
        country,
        phone,
        email,
        website,
    });

    res.status(201).json({
        data: provider,
    });
});

/**
 * @name updateProvider
 * @description Updatea Provider
 * @route PUT /api/v1/providers/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const updateProvider = AsyncHandler(async (req, res, next) => {
    const { ein, name, country, phone, email, website } = req.body;

    let provider = await Provider.findById(req.params.id);

    if (!provider) {
        return next(
            new ErrorResponse(
                `Provider not found with id of ${req.params.id}`,
                404
            )
        );
    }

    provider = await Provider.findByIdAndUpdate(
        req.params.id,
        {
            ein,
            name,
            country,
            phone,
            email,
            website,
        },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        data: provider,
    });
});

/**
 * @name deleteProvider
 * @description Delete one Provider
 * @route DELETE /api/v1/providers/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const deleteProvider = AsyncHandler(async (req, res, next) => {
    const provider = await Provider.findById(req.params.id);

    if (!provider) {
        return next(
            new ErrorResponse(
                `Provider not found with id of ${req.params.id}`,
                404
            )
        );
    }

    await provider.remove();

    res.status(200).json({
        data: `Provider ${provider.email} was deleted`,
    });
});

/**
 * @name uploadLogo
 * @description Upload array files
 * @route PUT /api/v1/providers/uploadlogo/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const uploadLogo = AsyncHandler(async (req, res, next) => {
    let provider = await Provider.findById(req.params.id);

    if (!provider) {
        return next(new ErrorResponse(`Provider not found`, 400));
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

        file.name = `${provider.id}.${file.mimetype.split("/")[1]}`;

        file.mv(`${Config.FILE_UPLOAD_PATH}/${file.name}`, async (error) => {
            if (error) {
                console.error(error);
                return next(
                    new ErrorResponse("Problems with file upload", 500)
                );
            }
        });
    }

    provider = await Provider.findByIdAndUpdate(
        req.params.id,
        { logo: files[0].name },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        data: provider,
    });
});
