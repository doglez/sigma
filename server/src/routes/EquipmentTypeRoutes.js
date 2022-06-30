import express from "express";
import {
    createEquipmentType,
    deleteEquipmentType,
    getEquipmentType,
    showEquipmentType,
    updateEquipmentType,
} from "../controllers/EquipmentTypeController.js";
import AdvancedResults from "../middleware/AdvancedResults.js";
import { authorize, protect } from "../middleware/AuthMiddleware.js";
import EquipmentType from "../models/EquipmentType.js";

const EquipmentTypeRoutes = express.Router();
EquipmentTypeRoutes.use(protect);

EquipmentTypeRoutes.route("/")
    .get(AdvancedResults(EquipmentType), getEquipmentType)
    .post(authorize("admin", "chief"), createEquipmentType);

EquipmentTypeRoutes.route("/:id")
    .get(authorize("admin", "chief"), showEquipmentType)
    .put(authorize("admin", "chief"), updateEquipmentType)
    .delete(authorize("admin", "chief"), deleteEquipmentType);

export default EquipmentTypeRoutes;
