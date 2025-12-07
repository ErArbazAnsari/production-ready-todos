import mongoose from "mongoose";

const todosModal = new mongoose.Schema(
    {
        todo: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
    },
    { timestamps: true }
);

export const TodosModal = mongoose.model("Todos", todosModal);
