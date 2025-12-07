import React from "react";
import { ModeToggle } from "./mode-toggle";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/slice/authSlice";

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user, loading } = useSelector(
        (state) => state.auth
    );

    const handleLogout = async () => {
        const result = await dispatch(logoutUser());
        // Check if logout was successful by seeing if auth state was cleared
        if (result.payload === null) {
            navigate("/auth/login");
        }
    };

    return (
        <nav className="border-b border-border bg-card backdrop-blur ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <NavLink to={"/"}>
                            <div>
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                    My Tasks
                                </h1>
                                <p className="text-sm sm:text-base mt-1 text-muted-foreground">
                                    Stay organized and productive
                                </p>
                            </div>
                        </NavLink>
                    </div>
                    <div className="flex items-center gap-4">
                        <ModeToggle />
                        <div className="flex gap-3">
                            {!isAuthenticated ? (
                                <>
                                    {/* unauthenticated */}
                                    <NavLink to={"/auth/login"}>
                                        <button className="px-4 py-2 text-sm font-medium rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
                                            Login
                                        </button>
                                    </NavLink>
                                    <NavLink to={"/auth/signup"}>
                                        <button className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 shadow-sm">
                                            Sign Up
                                        </button>
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    {/* authenticated */}
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-medium text-foreground">
                                            Welcome, {user}
                                        </span>
                                        <button
                                            onClick={handleLogout}
                                            disabled={loading}
                                            className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading
                                                ? "Logging out..."
                                                : "Logout"}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
