import express from "express";
import {
    createDepartment,
    deleteDepartment,
    getDepartments,
    showDepartments,
    updateDepartment,
} from "../controllers/DepartmentController.js";
import AdvancedResults from "../middleware/AdvancedResults.js";
import { authorize, protect } from "../middleware/AuthMiddleware.js";
import Department from "../models/Department.js";

const DepartmentRoutes = express.Router();
DepartmentRoutes.use(protect);

DepartmentRoutes.route("/")
    .get(AdvancedResults(Department), getDepartments)
    .post(authorize("super-admin", "admin", "chief"), createDepartment);
DepartmentRoutes.route("/:id")
    .get(showDepartments)
    .put(authorize("super-admin", "admin", "chief"), updateDepartment)
    .delete(authorize("super-admin", "admin", "chief"), deleteDepartment);

export default DepartmentRoutes;
