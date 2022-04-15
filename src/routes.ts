import { Router } from "express";

/**
 * App Routers
 */
import TasksRouter from "@app/modules/tasks/tasks.routes";
import UsersRouter from "@app/modules/users/users.routes";
import AuthRouter from "@app/modules/auth/auth.routes";

/**
 * Middlewares
 */
import { isAuthenticated } from "@app/modules/auth/auth.middlewares";

const router = Router();

router.use("/tasks", isAuthenticated, TasksRouter);
router.use("/users", UsersRouter);
router.use("/auth", AuthRouter);

export default router;
