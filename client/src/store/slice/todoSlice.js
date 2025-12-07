import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodoComplete,
} from "@/api/todos.api";

// Async thunks
export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllTodos();
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch todos"
            );
        }
    }
);

export const addNewTodo = createAsyncThunk(
    "todos/addNewTodo",
    async (todoData, { rejectWithValue }) => {
        try {
            const response = await createTodo(todoData);
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create todo"
            );
        }
    }
);

export const updateTodoItem = createAsyncThunk(
    "todos/updateTodoItem",
    async ({ id, updates }, { rejectWithValue }) => {
        try {
            const response = await updateTodo(id, updates);
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update todo"
            );
        }
    }
);

export const deleteTodoItem = createAsyncThunk(
    "todos/deleteTodoItem",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const res = await deleteTodo(id);
            if (res.success) {
                // update our slice todo
                dispatch(deleteTodo(id));
            }
            return id;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete todo"
            );
        }
    }
);

export const toggleTodoCompleted = createAsyncThunk(
    "todos/toggleTodoCompleted",
    async ({ id, completed }, { rejectWithValue }) => {
        try {
            const response = await toggleTodoComplete(id, completed);
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to toggle todo"
            );
        }
    }
);

// Initial state
const initialState = {
    todosList: [],
    loading: false,
    error: null,
};

// Slice
const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        clearAllTodos(state) {
            state.todosList = [];
        },
    },
    extraReducers: (builder) => {
        // Fetch todos
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todosList = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Add todo
        builder
            .addCase(addNewTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todosList.push(action.payload);
            })
            .addCase(addNewTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Update todo
        builder
            .addCase(updateTodoItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTodoItem.fulfilled, (state, action) => {
                state.loading = false;
                const todo = state.todosList.find(
                    (t) => t._id === action.payload._id || t.id === action.payload.id
                );
                if (todo) {
                    Object.assign(todo, action.payload);
                }
            })
            .addCase(updateTodoItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Delete todo
        builder
            .addCase(deleteTodoItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTodoItem.fulfilled, (state, action) => {
                state.loading = false;
                state.todosList = state.todosList.filter(
                    (t) => t._id !== action.payload && t.id !== action.payload
                );
            })
            .addCase(deleteTodoItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Toggle completed
        builder
            .addCase(toggleTodoCompleted.pending, (state) => {
                state.error = null;
            })
            .addCase(toggleTodoCompleted.fulfilled, (state, action) => {
                const todo = state.todosList.find(
                    (t) => t._id === action.payload._id || t.id === action.payload.id
                );
                if (todo) {
                    todo.completed = action.payload.completed;
                }
            })
            .addCase(toggleTodoCompleted.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearAllTodos } = todoSlice.actions;
export default todoSlice.reducer;
