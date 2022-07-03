import AsyncHandler from "../middleware/AsyncHandler.js";
import Department from "../models/Department.js";
import Task from "../models/Task.js";
import User from "../models/User.js";
import ErrorResponse from "../utilis/ErrorResponse.js";

/**
 * @name getTask
 * @description Get all Tasks
 * @route GET /api/v1/tasks
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const getTask = AsyncHandler(async (req, res, next) => {
    const tasks = [];
    const currentTasks = await Task.find();

    for (let i = 0; i < currentTasks.length; i++) {
        const { _id, type, taskNumber, department, user, status } =
            currentTasks[i];

        const departmentInfo = await Department.findById(department);
        const userInfo = await User.findById(user);
        let body;

        if (!userInfo) {
            body = {
                _id,
                type,
                taskNumber,
                department: departmentInfo.name,
                status,
            };
        } else {
            body = {
                _id,
                type,
                taskNumber,
                department: departmentInfo.name,
                user: userInfo.name,
                status,
            };
        }

        tasks.push(body);
    }

    res.status(200).json({
        data: tasks,
    });
});

/**
 * @name showTask
 * @description Get one Task
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
 * @description Create one Task
 * @route POST /api/v1/tasks
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const createTask = AsyncHandler(async (req, res, next) => {
    const { type, department, equipment } = req.body;
    const tasks = await Task.find();

    let taskNumber;

    if (tasks.length === 0) {
        taskNumber = 1;
    } else {
        taskNumber = tasks.length + 1;
    }

    const task = await Task.create({
        type,
        taskNumber,
        department,
        equipment,
    });

    res.status(201).json({
        data: task,
    });
});

/**
 * @name updateTask
 * @description Update a Task
 * @route PUT /api/v1/tasks/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const updateTask = AsyncHandler(async (req, res, next) => {
    const { type, department, equipment, user, status } = req.body;

    let task = await Task.findById(req.params.id);

    if (!task) {
        return next(
            new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
        );
    }

    task = await Task.findByIdAndUpdate(
        req.params.id,
        { type, department, equipment, user, status },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        data: task,
    });
});

/**
 * @name deleteTask
 * @description Delete one Task
 * @route DELETE /api/v1/tasks/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const deleteTask = AsyncHandler(async (req, res, next) => {
    let task = await Task.findById(req.params.id);

    if (!task) {
        return next(
            new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
        );
    }

    task = await Task.findByIdAndUpdate(
        req.params.id,
        { status: "cancel" },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        data: task,
    });
});
