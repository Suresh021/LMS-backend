import express from "express";
import {
    deleteUser,
    login,
    showUsers,
    signup,
} from "../controllers/userController.js";
const userRoutes = express.Router()
userRoutes.post("/register", signup)
userRoutes.post("/login", login)
userRoutes.get("/", showUsers)
userRoutes.delete("/:id", deleteUser)

export default userRoutes
