import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/todoSlice";
import authReducer from "./slice/authSlice";

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        auth: authReducer,
    },
});
