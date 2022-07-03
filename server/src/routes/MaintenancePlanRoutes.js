import express from "express";
import {
    createMaintenancePlan,
    deleteMaintenancePlan,
    getMaintenancePlan,
    showMaintenancePlan,
    updateMaintenancePlan,
} from "../controllers/MaintenancePlanController.js";
import AdvancedResults from "../middleware/AdvancedResults.js";
import { authorize, protect } from "../middleware/AuthMiddleware.js";
import MaintenancePlan from "../models/MaintenancePlan.js";

const MaintenancePlanRoutes = express.Router();
MaintenancePlanRoutes.use(protect);

MaintenancePlanRoutes.route("/")
    .get(AdvancedResults(MaintenancePlan), getMaintenancePlan)
    .post(authorize("admin", "chief"), createMaintenancePlan);

MaintenancePlanRoutes.route("/:id")
    .get(authorize("admin", "chief"), showMaintenancePlan)
    .put(authorize("admin", "chief"), updateMaintenancePlan)
    .delete(authorize("admin", "chief"), deleteMaintenancePlan);

export default MaintenancePlanRoutes;
