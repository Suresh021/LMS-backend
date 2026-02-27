import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import dbConnect from "./config/db.js";
import userRouter from "./routers/userRoute.js";
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config()
const startServer = async () => {
    await dbConnect();
    app.listen(8080, () => console.log("Server Started"));
};
startServer()

app.use("/api/users", userRouter);