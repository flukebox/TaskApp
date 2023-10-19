import { Router } from "express"
import * as TaskController from "../controllers/TaskController"

const TaskRoutes: Router = Router();

// add routes and point to right controller function
TaskRoutes.get("/tasks", TaskController.getTasks);
TaskRoutes.post("/add-task", TaskController.addTask);
TaskRoutes.put("/update-tasks/:id", TaskController.updateTask);
TaskRoutes.delete("/delete-tasks/:id", TaskController.deleteTask);

export default TaskRoutes;