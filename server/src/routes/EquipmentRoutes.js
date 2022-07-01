import express from "express";
import {
    createEquipment,
    deleteEquipment,
    getEquipment,
    showEquipment,
    updateEquipment,
} from "../controllers/EquipmentController.js";
import AdvancedResults from "../middleware/AdvancedResults.js";
import { authorize, protect } from "../middleware/AuthMiddleware.js";
import Equipment from "../models/Equipment.js";

const EquipmentRoutes = express.Router();
EquipmentRoutes.use(protect);

EquipmentRoutes.route("/")
    .get(AdvancedResults(Equipment), getEquipment)
    .post(authorize("admin", "chief"), createEquipment);

EquipmentRoutes.route("/:id")
    .get(authorize("admin", "chief"), showEquipment)
    .put(authorize("admin", "chief"), updateEquipment)
    .delete(authorize("admin", "chief"), deleteEquipment);

export default EquipmentRoutes;
