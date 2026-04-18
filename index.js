import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import dbConnect from "./config/db.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date()
    });
});

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/enrollments", enrollmentRoutes);

const startServer = async () => {
    try {
        console.log("Starting server...");
        console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "Missing");

        await dbConnect();

        const PORT = process.env.PORT || 8080;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Startup Error:", error.message);
        process.exit(1);
    }
};

startServer();