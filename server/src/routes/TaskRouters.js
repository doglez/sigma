import express from "express";
import {
    createTask,
    deleteTask,
    getTask,
    showTask,
    updateTask,
    uploadFiles,
} from "../controllers/TaskController.js";
import AdvancedResults from "../middleware/AdvancedResults.js";
import { authorize, protect } from "../middleware/AuthMiddleware.js";
import Task from "../models/Task.js";

const TaskRoutes = express.Router();
TaskRoutes.use(protect);

TaskRoutes.route("/")
    .get(AdvancedResults(Task), getTask)
    .post(authorize("chief", "supervisor"), createTask);

TaskRoutes.route("/:id")
    .get(authorize("chief", "supervisor"), showTask)
    .put(authorize("chief", "supervisor", "engineer"), updateTask)
    .delete(authorize("chief", "supervisor"), deleteTask);

TaskRoutes.route("/uploadfiles/:id").put(
    authorize("chief", "supervisor", "engineer"),
    uploadFiles
);

export default TaskRoutes;
