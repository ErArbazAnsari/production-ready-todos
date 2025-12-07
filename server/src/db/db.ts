import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL!);
        console.log("DB is connected!");
    } catch (error) {
        console.error("Unable to connect with DB:", error);
        throw error; // Re-throw to handle in caller
    }
};

// Graceful shutdown
export const disconnectFromDB = async () => {
    try {
        await mongoose.connection.close();
        console.log("DB disconnected successfully");
    } catch (error) {
        console.error("Error disconnecting from DB:", error);
    }
};
