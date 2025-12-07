import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // Vendor chunks
                    "react-vendor": ["react", "react-dom", "react-router-dom"],
                    "redux-vendor": ["redux", "react-redux", "@reduxjs/toolkit"],
                    "ui-vendor": ["lucide-react"],
                    "utils-vendor": ["axios", "react-toastify"],
                    
                    // Feature chunks
                    "auth": [
                        "./src/store/slice/authSlice.js",
                        "./src/pages/Login.jsx",
                        "./src/pages/Signup.jsx",
                    ],
                    "todos": [
                        "./src/store/slice/todoSlice.js",
                        "./src/pages/TodoLists.jsx",
                    ],
                },
            },
        },
        chunkSizeWarningLimit: 600,
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true,
            },
        },
    },
});
