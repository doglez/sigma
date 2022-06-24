import express from "express";
import AuthRoutes from "./AuthRoutes.js";
import DepartmentRoutes from "./DepartmentRoutes.js";
import UserRouter from "./UserRouter.js";

const Routes = express();

Routes.use("/auth", AuthRoutes);
Routes.use("/users", UserRouter);
Routes.use("/departments", DepartmentRoutes);

export default Routes;
