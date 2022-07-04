import express from "express";
import { getFilteredTasks } from "../controllers/TaskController.js";
import AgreementRoutes from "./AgreementRoutes.js";
import AuthRoutes from "./AuthRoutes.js";
import CompanyRoutes from "./CompanyRoutes.js";
import DepartmentRoutes from "./DepartmentRoutes.js";
import EquipmentRoutes from "./EquipmentRoutes.js";
import EquipmentTypeRoutes from "./EquipmentTypeRoutes.js";
import MaintenancePlanRoutes from "./MaintenancePlanRoutes.js";
import ProviderRouter from "./ProviderRoutes.js";
import TaskRoutes from "./TaskRouters.js";
import UserRouter from "./UserRouter.js";

const Routes = express();

Routes.use("/auth", AuthRoutes);
Routes.use("/company", CompanyRoutes);
Routes.use("/users", UserRouter);
Routes.use("/departments", DepartmentRoutes);
Routes.use("/providers", ProviderRouter);
Routes.use("/equipmenttypes", EquipmentTypeRoutes);
Routes.use("/equipments", EquipmentRoutes);
Routes.use("/agreements", AgreementRoutes);
Routes.use("/maintenanceplans", MaintenancePlanRoutes);
Routes.use("/tasks", TaskRoutes);
Routes.get("/filteredtasks", getFilteredTasks);

export default Routes;
