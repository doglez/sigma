import AsyncHandler from "../middleware/AsyncHandler.js";
import Equipment from "../models/Equipment.js";

/**
 * @name getEquipment
 * @description Get all Equipment
 * @route GET /api/v1/equipments
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const getEquipment = AsyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

/**
 * @name showEquipment
 * @description Get one Equipment
 * @route GET /api/v1/equipments/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const showEquipment = AsyncHandler(async (req, res, next) => {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
        return next(
            new ErrorResponse(
                `Equipment not found with id ${req.params.id}`,
                400
            )
        );
    }

    res.status(200).json({
        data: equipment,
    });
});

/**
 * @name createEquipment
 * @description Create one Equipment
 * @route POST /api/v1/equipments
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const createEquipment = AsyncHandler(async (req, res, next) => {
    const {
        inventoryNumber,
        name,
        brand,
        model,
        serial,
        equipmentType,
        provider,
        department,
        installDate,
        usableLife,
    } = req.body;

    const equipment = await Equipment.create({
        inventoryNumber,
        name,
        brand,
        model,
        serial,
        equipmentType,
        provider,
        department,
        installDate,
        usableLife,
    });

    res.status(201).json({
        data: equipment,
    });
});

/**
 * @name updateEquipment
 * @description Update one Equipment
 * @route PUT /api/v1/equipments/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const updateEquipment = AsyncHandler(async (req, res, next) => {
    const {
        name,
        brand,
        model,
        serial,
        equipmentType,
        provider,
        department,
        installDate,
        usableLife,
    } = req.body;

    let equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
        return next(
            new ErrorResponse(
                `Equipment not found with id ${req.params.id}`,
                400
            )
        );
    }

    equipment = await Equipment.findByIdAndUpdate(
        req.params.id,
        {
            name,
            brand,
            model,
            serial,
            equipmentType,
            provider,
            department,
            installDate,
            usableLife,
        },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        data: equipment,
    });
});

/**
 * @name deleteEquipment
 * @description Delete one Equipment
 * @route DELETE /api/v1/equipments/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Response
 */
export const deleteEquipment = AsyncHandler(async (req, res, next) => {
    let equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
        return next(
            new ErrorResponse(
                `Equipment not found with id ${req.params.id}`,
                400
            )
        );
    }

    await Equipment.remove();

    res.status(200).json({
        data: `Equipment ${equipment.name} was deleted`,
    });
});
