import { Router } from "express";
import * as TasksController from "./tasks.controllers";

const TasksRouter = Router();

TasksRouter.get("/", TasksController.getAll);
TasksRouter.get("/:id", TasksController.getById);
TasksRouter.post("/", TasksController.create);
TasksRouter.put("/:id", TasksController.edit);

export default TasksRouter;
