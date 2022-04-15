import { Router } from "express";
import * as UsersController from "./users.controllers";
import { isAuthenticated } from "../auth/auth.middlewares";

const UsersRouter = Router();

UsersRouter.get("/", isAuthenticated, UsersController.getAll);
UsersRouter.post("/register", UsersController.register);

export default UsersRouter;
