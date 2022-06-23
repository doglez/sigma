import express from "express";
import AuthRoutes from "./AuthRoutes.js";
import UserRouter from "./UserRouter.js";

const Routes = express();

Routes.use("/auth", AuthRoutes);
Routes.use("/users", UserRouter);

export default Routes;
