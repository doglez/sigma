import express from "express";
import AgreementrRoutes from "./AgreementrRoutes.js";
import AuthRoutes from "./AuthRoutes.js";
import CompanyRoutes from "./CompanyRoutes.js";
import DepartmentRoutes from "./DepartmentRoutes.js";
import EquipmentRoutes from "./EquipmentRoutes.js";
import EquipmentTypeRoutes from "./EquipmentTypeRoutes.js";
import ProviderRouter from "./ProviderRoutes.js";
import UserRouter from "./UserRouter.js";

const Routes = express();

Routes.use("/auth", AuthRoutes);
Routes.use("/company", CompanyRoutes);
Routes.use("/users", UserRouter);
Routes.use("/departments", DepartmentRoutes);
Routes.use("/providers", ProviderRouter);
Routes.use("/equipmenttypes", EquipmentTypeRoutes);
Routes.use("/equipments", EquipmentRoutes);
Routes.use("/agreements", AgreementrRoutes);

export default Routes;
