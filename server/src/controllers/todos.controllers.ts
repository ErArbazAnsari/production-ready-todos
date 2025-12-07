import type { Request, Response } from "express";
import { TodosModal } from "../models/todos.models.js";
import { todoSchema } from "../types/todos.types.js";
import { success } from "zod";

async function createTodo(req: Request, res: Response) {
    const userId = req.headers.userId;
    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized: userId not found",
        });
    }
    const todo = req.body;
    const validateSchema = todoSchema.safeParse(todo);
    if (!validateSchema.success) {
        return res.status(400).json({
            message: "Input data is not correct",
            errors: validateSchema.error.issues,
        });
    }
    // now saving the data into db
    try {
        const createRes = await TodosModal.create({
            ...todo,
            createdBy: userId,
        });
        res.status(201).json({
            message: "Todo created successfully",
            data: createRes,
        });
    } catch (error) {
        console.error("Unable to create user todo in db", error);
        res.status(500).json({
            message: "Unable to save user todo",
        });
    }
}
async function getAllTodos(req: Request, res: Response) {
    try {
        const userId = req.headers.userId;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: userId not found",
            });
        }
        const todos = await TodosModal.find({ createdBy: userId });
        res.status(200).json({
            message: "Todos retrieved successfully",
            data: todos,
        });
    } catch (error) {
        console.error("Unable to retrieve todos", error);
        res.status(500).json({
            message: "Unable to retrieve todos",
        });
    }
}
async function updatedTodo(req: Request, res: Response) {
    const { id } = req.params;
    const updates = req.body;
    const validateSchema = todoSchema.partial().safeParse(updates);
    if (!validateSchema.success) {
        return res.status(400).json({
            message: "Input data is not correct",
            errors: validateSchema.error.issues,
        });
    }
    try {
        const updatedTodo = await TodosModal.findByIdAndUpdate(
            id,
            validateSchema.data,
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({
            message: "Todo updated successfully",
            data: updatedTodo,
        });
    } catch (error) {
        console.error("Unable to update todo", error);
        res.status(500).json({
            message: "Unable to update todo",
        });
    }
}
async function deleteTodo(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const deletedTodo = await TodosModal.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({
            message: "Todo deleted successfully",
            data: deletedTodo._id,
        });
    } catch (error) {
        console.error("Unable to delete todo", error);
        res.status(500).json({
            message: "Unable to delete todo",
        });
    }
}

export default {
    getAllTodos,
    createTodo,
    updatedTodo,
    deleteTodo,
};
