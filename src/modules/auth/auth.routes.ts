import { Router } from "express";
import * as AuthController from "./auth.controllers";

const AuthRouter = Router();

AuthRouter.post("/login", AuthController.login);

export default AuthRouter;
