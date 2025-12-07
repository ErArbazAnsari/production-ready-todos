// src/router.tsx
import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

import AppLayout from "@/layouts/AppLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

// Lazy load pages for code splitting
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const TodoLists = lazy(() => import("@/pages/TodoLists"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Loading component
const PageLoader = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-muted-foreground">Loading...</p>
        </div>
    </div>
);

export const router = createBrowserRouter([
    // Main app layout
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: "todos",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <ProtectedRoute>
                            <TodoLists />
                        </ProtectedRoute>
                    </Suspense>
                ),
            },
        ],
    },

    // Auth routes
    {
        path: "/auth",
        element: <AppLayout />,
        children: [
            {
                path: "login",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: "signup",
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Signup />
                    </Suspense>
                ),
            },
        ],
    },

    // 404
    {
        path: "*",
        element: (
            <Suspense fallback={<PageLoader />}>
                <NotFound />
            </Suspense>
        ),
    },
]);
