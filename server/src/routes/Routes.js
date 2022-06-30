import express from "express";
import AuthRoutes from "./AuthRoutes.js";
import CompanyRoutes from "./CompanyRoutes.js";
import DepartmentRoutes from "./DepartmentRoutes.js";
import ProviderRouter from "./ProviderRoutes.js";
import UserRouter from "./UserRouter.js";

const Routes = express();

Routes.use("/auth", AuthRoutes);
Routes.use("/company", CompanyRoutes);
Routes.use("/users", UserRouter);
Routes.use("/departments", DepartmentRoutes);
Routes.use("/providers", ProviderRouter);

export default Routes;
