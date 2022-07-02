import Config from "../config/Config.js";
import AsyncHandler from "../middleware/AsyncHandler.js";
import Agreement from "../models/Agreement.js";
import ErrorResponse from "../utilis/ErrorResponse.js";

/**
 * @name getAgreements
 * @description Get all Agreements
 * @route GET /api/v1/agreements
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const getAgreements = AsyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

/**
 * @name showAgreement
 * @description Get one Agreement
 * @route GET /api/v1/agreements/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const showAgreement = AsyncHandler(async (req, res, next) => {
    const agreement = await Agreement.findById(req.params.id);

    if (!agreement) {
        return next(
            new ErrorResponse(
                `Agreement not found with id ${req.params.id}`,
                400
            )
        );
    }

    res.status(200).json({
        data: agreement,
    });
});

/**
 * @name createAgreement
 * @description Create or updatea Agreement
 * @route PUT /api/v1/agreements
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const createAgreement = AsyncHandler(async (req, res, next) => {
    const {
        agreementNumber,
        department,
        provider,
        reference,
        startDate,
        expDate,
        equipments,
    } = req.body;

    const agreement = await Agreement.create({
        agreementNumber,
        department,
        provider,
        reference,
        startDate,
        expDate,
        equipments,
    });

    res.status(201).json({
        data: agreement,
    });
});

/**
 * @name updateAgreement
 * @description Updatea Agreement
 * @route PUT /api/v1/agreements/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const updateAgreement = AsyncHandler(async (req, res, next) => {
    const {
        agreementNumber,
        department,
        provider,
        reference,
        startDate,
        expDate,
        equipments,
    } = req.body;

    let agreement = await Agreement.findById(req.params.id);

    if (!agreement) {
        return next(
            new ErrorResponse(
                `Agreement not found with id of ${req.params.id}`,
                404
            )
        );
    }

    agreement = await Agreement.findByIdAndUpdate(
        req.params.id,
        {
            agreementNumber,
            department,
            provider,
            reference,
            startDate,
            expDate,
            equipments,
        },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        data: agreement,
    });
});

/**
 * @name deleteAgreement
 * @description Delete one Agreement
 * @route DELETE /api/v1/agreements/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const deleteAgreement = AsyncHandler(async (req, res, next) => {
    const agreement = await Agreement.findById(req.params.id);

    console.log(agreement.equipments);

    if (!agreement) {
        return next(
            new ErrorResponse(
                `Agreement not found with id of ${req.params.id}`,
                404
            )
        );
    }

    // Validate if the Agreement has equipments
    if (agreement.equipments.length > 0) {
        return next(
            new ErrorResponse(
                `Agreement cannot be deleted because it has equipments`,
                400
            )
        );
    }

    await agreement.remove();

    res.status(200).json({
        data: `Agreement ${agreement.reference} was deleted`,
    });
});

/**
 * @name uploadFiles
 * @description Upload array files
 * @route PUT /api/v1/agreements/uploadfiles/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const uploadFiles = AsyncHandler(async (req, res, next) => {
    let agreement = await Agreement.findById(req.params.id);

    if (!agreement) {
        return next(new ErrorResponse(`Agreement not found`, 400));
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

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.mimetype !== "application/pdf") {
            return next(new ErrorResponse(`Only supports PDF`, 400));
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

        file.name = `${agreement.id}_${i}.${file.mimetype.split("/")[1]}`;

        file.mv(
            `${Config.FILE_UPLOAD_PATH}/agreements/${file.name}`,
            async (error) => {
                if (error) {
                    console.error(error);
                    return next(
                        new ErrorResponse("Problems with file upload", 500)
                    );
                }
            }
        );

        files[i] = file.name;
    }

    agreement = await Agreement.findByIdAndUpdate(
        req.params.id,
        { files: files },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        data: agreement,
    });
});
