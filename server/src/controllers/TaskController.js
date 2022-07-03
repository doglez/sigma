import AsyncHandler from "../middleware/AsyncHandler.js";
import Task from "../models/Task.js";
import ErrorResponse from "../utilis/ErrorResponse.js";

/**
 * @name getTask
 * @description Get all Maintenance Plans
 * @route GET /api/v1/tasks
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const getTask = AsyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

/**
 * @name showTask
 * @description Get one Maintenance Plan
 * @route GET /api/v1/tasks/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const showTask = AsyncHandler(async (req, res, next) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return next(
            new ErrorResponse(
                `Task Type not found with id ${req.params.id}`,
                400
            )
        );
    }

    res.status(200).json({
        data: task,
    });
});

/**
 * @name createTask
 * @description Create one Maintenance Plan
 * @route POST /api/v1/tasks
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const createTask = AsyncHandler(async (req, res, next) => {
    const {
        type,
        taskNumber,
        department,
        agreement,
        maintenancePlan,
        equipment,
        user,
        status,
    } = req.body;

    const tasks = await Task.find();

    console.log(tasks);

    if (!tasks) {
        return next(
            new ErrorResponse(
                `Task Type not found with id ${req.params.id}`,
                400
            )
        );
    }

    // let equipments = [];

    // for (let i = 0; i < agreement.length; i++) {
    //     const agreementID = agreement[i];
    //     const agreementsInfo = await Agreement.findById(agreementID);

    //     const equipmentsList = agreementsInfo.equipments;

    //     for (let j = 0; j < equipmentsList.length; j++) {
    //         const equipment = equipmentsList[j];
    //         equipments.push(equipment);
    //     }
    // }

    // const task = await Task.create({
    //     type,
    //     taskNumber,
    //     department,
    //     agreement,
    //     maintenancePlan,
    //     equipment,
    //     user,
    //     status,
    // });

    res.status(201).json({
        data: "task",
    });
});

/**
 * @name updateTask
 * @description Update a Maintenance Plan
 * @route PUT /api/v1/tasks/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const updateTask = AsyncHandler(async (req, res, next) => {
    const { year, name, frequency, department, agreement } = req.body;

    let task = await Task.findById(req.params.id);

    if (!task) {
        return next(
            new ErrorResponse(
                `Provider not found with id of ${req.params.id}`,
                404
            )
        );
    }

    task = await Task.findByIdAndUpdate(
        req.params.id,
        { name, description },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        data: "task",
    });
});

/**
 * @name deleteTask
 * @description Delete one Maintenance Plan
 * @route DELETE /api/v1/tasks/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const deleteTask = AsyncHandler(async (req, res, next) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return next(
            new ErrorResponse(
                `Maintenance Plan not found with id of ${req.params.id}`,
                404
            )
        );
    }

    await task.remove();

    res.status(200).json({
        data: `Maintenance Plan ${task.name} was deleted`,
    });
});
