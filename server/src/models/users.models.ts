import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: false,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

export const UsersModal = mongoose.model("Users", userSchema);
