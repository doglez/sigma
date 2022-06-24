import express from "express";
import {
    createUser,
    deleteUser,
    getUsers,
    showUser,
    updateUser,
    uploadPhoto,
} from "../controllers/UserController.js";
import AdvancedResults from "../middleware/AdvancedResults.js";
import { authorize, protect } from "../middleware/AuthMiddleware.js";
import User from "../models/User.js";

const UserRouter = express.Router();
UserRouter.use(protect);

UserRouter.route("/")
    .get(AdvancedResults(User), getUsers)
    .post(authorize("super-admin", "admin", "chief"), createUser);
UserRouter.route("/:id")
    .get(showUser)
    .put(authorize("super-admin", "admin", "chief"), updateUser)
    .delete(authorize("super-admin", "admin", "chief"), deleteUser);
UserRouter.route("/uploadphoto/:id").put(
    authorize("super-admin", "admin", "chief"),
    uploadPhoto
);

export default UserRouter;
