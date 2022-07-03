import express from "express";
import {
    createTask,
    deleteTask,
    getTask,
    showTask,
    updateTask,
} from "../controllers/TaskController.js";
import AdvancedResults from "../middleware/AdvancedResults.js";
import { authorize, protect } from "../middleware/AuthMiddleware.js";
import Task from "../models/Task.js";

const TaskRoutes = express.Router();
TaskRoutes.use(protect);

TaskRoutes.route("/")
    .get(AdvancedResults(Task), getTask)
    .post(authorize("admin", "chief"), createTask);

TaskRoutes.route("/:id")
    .get(authorize("admin", "chief"), showTask)
    .put(authorize("admin", "chief"), updateTask)
    .delete(authorize("admin", "chief"), deleteTask);

export default TaskRoutes;
