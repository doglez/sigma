import Config from "../config/Config.js";
import AsyncHandler from "../middleware/AsyncHandler.js";
import Company from "../models/Company.js";
import ErrorResponse from "../utilis/ErrorResponse.js";

/**
 * @name getCompany
 * @description Get company
 * @route GET /api/v1/company
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const getCompany = AsyncHandler(async (req, res, next) => {
    const company = await Company.find({ tag: "unique" });

    res.status(200).json({
        success: true,
        data: company,
    });
});

/**
 * @name createOrUpdateCompany
 * @description Create or updatea company
 * @route PUT /api/v1/company
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const createOrUpdateCompany = AsyncHandler(async (req, res, next) => {
    const {
        name,
        address,
        zipCode,
        country,
        stateProvince,
        currency,
        phone,
        email,
        website,
    } = req.body;

    const companyValidation = await Company.find({ tag: "unique" });
    let company;

    if (companyValidation.length < 1) {
        company = await Company.create({
            name,
            address,
            zipCode,
            country,
            stateProvince,
            currency,
            phone,
            email,
            website,
        });
    } else {
        company = await Company.findOneAndUpdate(
            { tag: "unique" },
            {
                name,
                address,
                zipCode,
                country,
                stateProvince,
                currency,
                phone,
                email,
                website,
            },
            {
                runValidators: true,
            }
        );
    }

    res.status(201).json({
        success: true,
        data: company,
    });
});

/**
 * @name uploadLogo
 * @description Upload logo
 * @route PUT /api/v1/company/uploadlogo
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const uploadLogo = AsyncHandler(async (req, res, next) => {
    const companies = await Company.find({ tag: "unique" });
    let company = companies[0];
    console.log(company);

    if (companies.length < 1) {
        return next(
            new ErrorResponse(
                `First you have to update the company information.`,
                400
            )
        );
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

        if (file.mimetype !== "image/png") {
            return next(new ErrorResponse(`Only supports PNG`, 400));
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

        file.name = `logo-company.png`;

        file.mv(`${Config.FILE_UPLOAD_PATH}/${file.name}`, async (error) => {
            if (error) {
                console.error(error);
                return next(
                    new ErrorResponse("Problems with file upload", 500)
                );
            }
        });
    }

    company = await Company.findByIdAndUpdate(
        company.id,
        { logo: files[0].name },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        success: true,
        data: company,
    });
});
