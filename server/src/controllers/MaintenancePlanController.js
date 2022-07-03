import AsyncHandler from "../middleware/AsyncHandler.js";
import Agreement from "../models/Agreement.js";
import MaintenancePlan from "../models/MaintenancePlan.js";
import ErrorResponse from "../utilis/ErrorResponse.js";

/**
 * @name getMaintenancePlan
 * @description Get all Maintenance Plans
 * @route GET /api/v1/maintenanceplans
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const getMaintenancePlan = AsyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

/**
 * @name showMaintenancePlan
 * @description Get one Maintenance Plan
 * @route GET /api/v1/maintenanceplans/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const showMaintenancePlan = AsyncHandler(async (req, res, next) => {
    const maintenanceplan = await MaintenancePlan.findById(
        req.params.id
    ).populate({
        path: "task",
        select: "reference",
    });

    if (!maintenanceplan) {
        return next(
            new ErrorResponse(
                `MaintenancePlan Type not found with id ${req.params.id}`,
                400
            )
        );
    }

    res.status(200).json({
        data: maintenanceplan,
    });
});

/**
 * @name createMaintenancePlan
 * @description Create one Maintenance Plan
 * @route POST /api/v1/maintenanceplans
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const createMaintenancePlan = AsyncHandler(async (req, res, next) => {
    const { year, name, frequency, department, agreement } = req.body;
    let equipments = [];

    for (let i = 0; i < agreement.length; i++) {
        const agreementID = agreement[i];
        const agreementsInfo = await Agreement.findById(agreementID);

        const equipmentsList = agreementsInfo.equipments;

        for (let j = 0; j < equipmentsList.length; j++) {
            const equipment = equipmentsList[j];
            equipments.push(equipment);
        }
    }

    const maintenanceplan = await MaintenancePlan.create({
        year,
        name,
        frequency,
        department,
        agreement,
        equipments,
    });

    res.status(201).json({
        data: maintenanceplan,
    });
});

/**
 * @name updateMaintenancePlan
 * @description Update a Maintenance Plan
 * @route PUT /api/v1/maintenanceplans/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const updateMaintenancePlan = AsyncHandler(async (req, res, next) => {
    const { year, name, frequency, department, agreement } = req.body;
    let maintenanceplan = await MaintenancePlan.findById(req.params.id);

    if (!maintenanceplan) {
        return next(
            new ErrorResponse(
                `Provider not found with id of ${req.params.id}`,
                404
            )
        );
    }

    let equipments = [];

    for (let i = 0; i < agreement.length; i++) {
        const agreementID = agreement[i];
        const agreementsInfo = await Agreement.findById(agreementID);

        const equipmentsList = agreementsInfo.equipments;

        for (let j = 0; j < equipmentsList.length; j++) {
            const equipment = equipmentsList[j];
            equipments.push(equipment);
        }
    }

    maintenanceplan = await MaintenancePlan.findByIdAndUpdate(
        req.params.id,
        {
            year,
            name,
            frequency,
            department,
            agreement,
            equipments,
        },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        data: "maintenanceplan",
    });
});

/**
 * @name deleteMaintenancePlan
 * @description Delete one Maintenance Plan
 * @route DELETE /api/v1/maintenanceplans/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const deleteMaintenancePlan = AsyncHandler(async (req, res, next) => {
    const maintenanceplan = await MaintenancePlan.findById(req.params.id);

    if (!maintenanceplan) {
        return next(
            new ErrorResponse(
                `Maintenance Plan not found with id of ${req.params.id}`,
                404
            )
        );
    }

    await maintenanceplan.remove();

    res.status(200).json({
        data: `Maintenance Plan ${maintenanceplan.name} was deleted`,
    });
});
