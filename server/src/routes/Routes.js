import express from "express";
import UserRouter from "./UserRouter.js";

const Routes = express();

Routes.use("/users", UserRouter);

export default Routes;
