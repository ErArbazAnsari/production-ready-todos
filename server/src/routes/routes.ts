import express from "express";
const router = express.Router();
import todosController from "../controllers/todos.controllers.js";
import authControllers from "../controllers/auth.controllers.js";
import { authCheck } from "../middlewares/auth_check.js";

router.post("/auth/login", authControllers.login);
router.post("/auth/signup", authControllers.signup);
router.post("/auth/logout", authControllers.logout);
router.get("/auth/me", authCheck, authControllers.getCurrentUser);
router.get("/auth/refresh-token", authCheck, authControllers.refreshToken);
router.patch("/auth/forgot-password", authControllers.forgotPassword);
router.delete("/auth/delete-account", authCheck, authControllers.deleteAccount);

router.get("/todos", authCheck, todosController.getAllTodos);
router.post("/todo", authCheck, todosController.createTodo);
router.patch("/todo/:id", authCheck, todosController.updatedTodo);
router.delete("/todo/:id", authCheck, todosController.deleteTodo);

export default router;
