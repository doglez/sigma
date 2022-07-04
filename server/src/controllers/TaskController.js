import Config from "../config/Config.js";
import AsyncHandler from "../middleware/AsyncHandler.js";
import Department from "../models/Department.js";
import Equipment from "../models/Equipment.js";
import MaintenancePlan from "../models/MaintenancePlan.js";
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

    // res.status(200).json(res.advancedResults);

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
    const { type, department, equipment, user } = req.body;
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
        user,
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

/**
 * @name uploadFiles
 * @description Upload array files
 * @route PUT /api/v1/tasks/uploadfiles/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const uploadFiles = AsyncHandler(async (req, res, next) => {
    let task = await Task.findById(req.params.id);

    if (!task) {
        return next(new ErrorResponse(`Task not found`, 400));
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

        if (
            file.mimetype !== "image/jpeg" &&
            file.mimetype !== "application/pdf"
        ) {
            return next(new ErrorResponse(`Only supports PDF and JPG`, 400));
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

        file.name = `${task.id}_${i}.${file.mimetype.split("/")[1]}`;

        file.mv(
            `${Config.FILE_UPLOAD_PATH}/tasks/${file.name}`,
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

    task = await Task.findByIdAndUpdate(
        req.params.id,
        { files: files },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        data: task,
    });
});

/**
 * @name getFilteredTasks
 * @description Get all Tasks filtered by status and department
 * @route GET /api/v1/filteredtasks
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const getFilteredTasks = AsyncHandler(async (req, res, next) => {
    const dept = req.query.dept;
    const bTasks = [];
    const ipTasks = [];
    const dTasks = [];
    const cTasks = [];

    let backlogTasks;
    let inProgressTasks;
    let doneTasks;
    let cancelTasks;

    if (dept) {
        backlogTasks = await Task.find({ department: dept, status: "backlog" });
        inProgressTasks = await Task.find({
            department: dept,
            status: "in-progress",
        });
        doneTasks = await Task.find({ department: dept, status: "done" });
        cancelTasks = await Task.find({ department: dept, status: "cancel" });
    } else {
        backlogTasks = await Task.find({ status: "backlog" });
        inProgressTasks = await Task.find({ status: "in-progress" });
        doneTasks = await Task.find({ status: "done" });
        cancelTasks = await Task.find({ status: "cancel" });
    }

    for (let i = 0; i < backlogTasks.length; i++) {
        const {
            _id,
            type,
            taskNumber,
            department,
            equipment,
            status,
            maintenancePlan,
        } = backlogTasks[i];

        const departmentInfo = await Department.findById(department);
        const equipmentInfo = await Equipment.findById(equipment);
        const maintenancePlanInfo = await MaintenancePlan.findById(
            maintenancePlan
        );

        bTasks.push({
            _id,
            type,
            taskNumber,
            maintenancePlan: maintenancePlanInfo.name,
            department: departmentInfo.name,
            equipment: equipmentInfo.name,
            status,
        });
    }

    for (let i = 0; i < inProgressTasks.length; i++) {
        const { _id, type, taskNumber, department, equipment, status } =
            inProgressTasks[i];

        const departmentInfo = await Department.findById(department);
        const equipmentInfo = await Equipment.findById(equipment);

        ipTasks.push({
            _id,
            type,
            taskNumber,
            department: departmentInfo.name,
            equipment: equipmentInfo.name,
            status,
        });
    }

    for (let i = 0; i < doneTasks.length; i++) {
        const { _id, type, taskNumber, department, equipment, status } =
            doneTasks[i];

        const departmentInfo = await Department.findById(department);
        const equipmentInfo = await Equipment.findById(equipment);

        dTasks.push({
            _id,
            type,
            taskNumber,
            department: departmentInfo.name,
            equipment: equipmentInfo.name,
            status,
        });
    }

    for (let i = 0; i < cancelTasks.length; i++) {
        const { _id, type, taskNumber, department, equipment, status } =
            cancelTasks[i];

        const departmentInfo = await Department.findById(department);
        const equipmentInfo = await Equipment.findById(equipment);

        cTasks.push({
            _id,
            type,
            taskNumber,
            department: departmentInfo.name,
            equipment: equipmentInfo.name,
            status,
        });
    }

    res.status(200).json({
        backlog: bTasks,
        inProgress: ipTasks,
        done: dTasks,
        cancel: cTasks,
    });
});
