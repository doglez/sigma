import AsyncHandler from "../middleware/AsyncHandler.js";
import Agreement from "../models/Agreement.js";
import Department from "../models/Department.js";
import MaintenancePlan from "../models/MaintenancePlan.js";
import Task from "../models/Task.js";
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
    let maintenancePlans = [];
    const maintenancePlansInfo = await MaintenancePlan.find();

    for (let i = 0; i < maintenancePlansInfo.length; i++) {
        const {
            _id,
            year,
            name,
            frequency,
            department,
            agreements,
            equipments,
        } = maintenancePlansInfo[i];

        let body = {};
        const departmentInfo = await Department.findById(department);

        body._id = _id;
        body.year = year;
        body.name = name;
        body.frequency = frequency;
        body.department = departmentInfo.name;
        body.agreements = agreements.length;
        body.equipments = equipments.length;
        body.totalTasks = equipments.length * frequency;

        maintenancePlans.push(body);
    }

    res.status(200).json({
        data: maintenancePlans,
    });
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
    const { year, name, frequency, department, agreements } = req.body;
    let equipments = [];

    for (let i = 0; i < agreements.length; i++) {
        const agreementID = agreements[i];
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
        agreements,
        equipments,
    });

    for (let k = 0; k < equipments.length; k++) {
        for (let l = 1; l <= frequency; l++) {
            const tasks = await Task.find();
            let taskNumber;

            if (tasks.length === 0) {
                taskNumber = 1;
            } else {
                taskNumber = tasks.length + 1;
            }

            const equipment = equipments[k];
            const task = await Task.create({
                taskNumber,
                department,
                maintenancePlan: maintenanceplan._id,
                equipment,
            });
        }
    }

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
    let maintenanceplan = await MaintenancePlan.findById(req.params.id);
    if (!maintenanceplan) {
        return next(
            new ErrorResponse(
                `Maintenance Plan not found with id of ${req.params.id}`,
                404
            )
        );
    }

    const { year, name, frequency, department, agreements } = req.body;
    let equipments = [];

    for (let i = 0; i < agreements.length; i++) {
        const agreementID = agreements[i];
        const agreementsInfo = await Agreement.findById(agreementID);

        const equipmentsList = agreementsInfo.equipments;

        for (let j = 0; j < equipmentsList.length; j++) {
            const equipment = equipmentsList[j];
            equipments.push(equipment);
        }
    }

    for (let k = 0; k < equipments.length; k++) {
        for (let l = 1; l <= frequency; l++) {
            const tasks = await Task.find();
            let taskNumber;

            if (tasks.length === 0) {
                taskNumber = 1;
            } else {
                taskNumber = tasks.length + 1;
            }

            const equipment = equipments[k];
            const task = await Task.create({
                taskNumber,
                department,
                maintenancePlan: maintenanceplan._id,
                equipment,
            });
        }
    }

    maintenanceplan = await MaintenancePlan.findByIdAndUpdate(
        req.params.id,
        {
            year,
            name,
            frequency,
            department,
            agreements,
            equipments,
        },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        data: maintenanceplan,
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
