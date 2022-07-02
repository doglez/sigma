import AsyncHandler from "../middleware/AsyncHandler.js";
import Department from "../models/Department.js";
import Equipment from "../models/Equipment.js";
import User from "../models/User.js";
import ErrorResponse from "../utilis/ErrorResponse.js";

/**
 * @name getDepartments
 * @description Get all departments
 * @route GET /api/v1/departments
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const getDepartments = AsyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

/**
 * @name showDepartment
 * @description Get one department
 * @route GET /api/v1/departments/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const showDepartment = AsyncHandler(async (req, res, next) => {
    const department = await Department.findById(req.params.id)
        .populate({
            path: "user",
            select: "name email",
        })
        .populate({
            path: "equipment",
            select: "inventoryNumber name",
        })
        .populate({
            path: "agreement",
            select: "reference",
        });

    if (!department) {
        return next(
            new ErrorResponse(
                `Department not found with id ${req.params.id}`,
                400
            )
        );
    }

    res.status(200).json({
        data: department,
    });
});

/**
 * @name createDepartment
 * @description Create one department
 * @route POST /api/v1/departments
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const createDepartment = AsyncHandler(async (req, res, next) => {
    const { departmentNumber, name, email } = req.body;

    const department = await Department.create({
        departmentNumber,
        name,
        email,
    });

    res.status(201).json({
        data: department,
    });
});

/**
 * @name updateDepartment
 * @description Update one department
 * @route PUT /api/v1/departments/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const updateDepartment = AsyncHandler(async (req, res, next) => {
    const { name, email } = req.body;

    let department = await Department.findById(req.params.id);

    if (!department) {
        return next(
            new ErrorResponse(
                `Department not found with id ${req.params.id}`,
                400
            )
        );
    }

    department = await Department.findByIdAndUpdate(
        req.params.id,
        {
            name,
            email,
        },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        data: department,
    });
});

/**
 * @name deleteDepartment
 * @description Delete one department
 * @route DELETE /api/v1/departments/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const deleteDepartment = AsyncHandler(async (req, res, next) => {
    let department = await Department.findById(req.params.id);

    if (!department) {
        return next(
            new ErrorResponse(
                `Department not found with id ${req.params.id}`,
                400
            )
        );
    }

    // Validate if the department has users
    const users = await User.find({ department: department.id });
    if (users.length > 0) {
        return next(
            new ErrorResponse(
                `Department cannot be deleted because it has users`,
                400
            )
        );
    }

    // Validate if the department has equipments
    const equipments = await Equipment.find({ department: department.id });
    if (equipments.length > 0) {
        return next(
            new ErrorResponse(
                `Department cannot be deleted because it has equipments`,
                400
            )
        );
    }

    await department.remove();

    res.status(200).json({
        data: `Department ${department.name} was deleted`,
    });
});
