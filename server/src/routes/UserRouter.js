import express from "express";
import {
    createUser,
    deleteUser,
    getUsers,
    showUser,
    updateUser,
} from "../controllers/UserController.js";
import AdvancedResults from "../middleware/AdvancedResults.js";
import { authorize, protect } from "../middleware/AuthMiddleware.js";
import User from "../models/User.js";

const UserRouter = express.Router();
UserRouter.use(protect);
UserRouter.use(authorize("super-admin", "admin", "chief"));

UserRouter.route("/").get(AdvancedResults(User), getUsers).post(createUser);
UserRouter.route("/:id").get(showUser).put(updateUser).delete(deleteUser);

export default UserRouter;
