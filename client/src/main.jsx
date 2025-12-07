import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./components/theme-provider";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <Provider store={store}>
                <App />
                <ToastContainer
                    position="bottom-right"
                    theme="dark"
                    autoClose={2000}
                />
            </Provider>
        </ThemeProvider>
    </StrictMode>
);
