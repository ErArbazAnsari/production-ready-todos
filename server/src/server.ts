import express, { type Request, type Response } from "express";
import { EnvConfigure } from "./config/env.config.js";
import { connectToDB, disconnectFromDB } from "./db/db.js";
import cors from "cors";
import ApiRoutes from "./routes/routes.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.ORIGIN_URL,
    })
);

// Routes
app.get("/health", (req: Request, res: Response) => {
    res.json({
        environment: process.env.ENVIRONMENT,
        message: "system is running perfectly!",
        timestamp: new Date().toISOString(),
    });
});

// Other Routes
app.use("/api", ApiRoutes);

// Connect to DB and start server
const startServer = async () => {
    try {
        await connectToDB();
        app.listen(PORT, () => {
            console.log(
                `Todos app backend is running on port=${PORT} in ${
                    EnvConfigure && process.env.ENVIRONMENT
                } mode`
            );
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();

// Graceful shutdown
process.on("SIGTERM", async () => {
    console.log("\nSIGTERM received, shutting down gracefully");
    await disconnectFromDB();
    process.exit(0);
});

process.on("SIGINT", async () => {
    console.log("\nSIGINT received, shutting down gracefully");
    await disconnectFromDB();
    process.exit(0);
});
