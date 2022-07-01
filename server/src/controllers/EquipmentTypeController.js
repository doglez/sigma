import AsyncHandler from "../middleware/AsyncHandler.js";
import EquipmentType from "../models/EquipmentType.js";
import ErrorResponse from "../utilis/ErrorResponse.js";

/**
 * @name getEquipmentType
 * @description Get all Equipment Types
 * @route GET /api/v1/equipmenttypes
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const getEquipmentType = AsyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

/**
 * @name showEquipmentType
 * @description Get one Equipment Type
 * @route GET /api/v1/equipmenttypes/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const showEquipmentType = AsyncHandler(async (req, res, next) => {
    const equipmenttype = await EquipmentType.findById(req.params.id).populate({
        path: "equipment",
        select: "inventoryNumber name",
    });

    if (!equipmenttype) {
        return next(
            new ErrorResponse(
                `Equipment Type not found with id ${req.params.id}`,
                400
            )
        );
    }

    res.status(200).json({
        data: equipmenttype,
    });
});

/**
 * @name createEquipmentType
 * @description Create one Equipment Type
 * @route POST /api/v1/equipmenttypes
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const createEquipmentType = AsyncHandler(async (req, res, next) => {
    const { name, description } = req.body;

    const equipmenttype = await EquipmentType.create({
        name,
        description,
    });

    res.status(201).json({
        data: equipmenttype,
    });
});

/**
 * @name updateEquipmentType
 * @description Updatea Equipment Type
 * @route PUT /api/v1/equipmenttypes/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const updateEquipmentType = AsyncHandler(async (req, res, next) => {
    const { name, description } = req.body;

    let equipmenttype = await EquipmentType.findById(req.params.id);

    if (!equipmenttype) {
        return next(
            new ErrorResponse(
                `Provider not found with id of ${req.params.id}`,
                404
            )
        );
    }

    equipmenttype = await EquipmentType.findByIdAndUpdate(
        req.params.id,
        { name, description },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        data: equipmenttype,
    });
});

/**
 * @name deleteEquipmentType
 * @description Delete one Equipment Type
 * @route DELETE /api/v1/equipmenttypes/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const deleteEquipmentType = AsyncHandler(async (req, res, next) => {
    const equipmenttype = await EquipmentType.findById(req.params.id);

    if (!equipmenttype) {
        return next(
            new ErrorResponse(
                `Equipment Type not found with id of ${req.params.id}`,
                404
            )
        );
    }

    await equipmenttype.remove();

    res.status(200).json({
        data: `Equipment Type ${equipmenttype.name} was deleted`,
    });
});
