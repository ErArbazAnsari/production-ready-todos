import { login, logout, signup } from "@/api/auth.api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearAllTodos } from "./todoSlice";

// Async thunks
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await login(email, password);
            if (response.token) localStorage.setItem("token", response.token);
            if (response.user)
                localStorage.setItem("user", JSON.stringify(response.user));
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async ({ email, password, name }, { rejectWithValue }) => {
        try {
            const response = await signup({ email, password, name });
            if (response.token) localStorage.setItem("token", response.token);
            if (response.user)
                localStorage.setItem("user", JSON.stringify(response.user));
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Signup failed"
            );
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { dispatch }) => {
        try {
            await logout();
        } catch (error) {
            console.warn(
                "Logout API call failed, clearing local state anyway:",
                error
            );
        }
        // Always clear local state regardless of API success/failure
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Clear all todos from Redux store
        dispatch(clearAllTodos());
        return null;
    }
);

// Initial state
const getInitialUser = () => {
    try {
        if (typeof window === "undefined") return null; // SSR check
        const user = localStorage.getItem("user");
        if (!user || user === "undefined") return null;
        return JSON.parse(user);
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        return null;
    }
};

const getInitialToken = () => {
    try {
        if (typeof window === "undefined") return null; // SSR check
        const token = localStorage.getItem("token");
        if (!token || token === "undefined") return null;
        return token;
    } catch {
        return null;
    }
};

const initialState = {
    user: getInitialUser(),
    token: getInitialToken(),
    loading: false,
    error: null,
    isAuthenticated: !!getInitialToken(),
};

// Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Login
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Signup
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Logout
        builder
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
