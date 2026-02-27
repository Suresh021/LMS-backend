import express from "express";
import {
    deleteUser,
    login,
    showUsers,
    signup,
} from "../controllers/userController.js";
const userRouter = express.Router()
userRouter.post("/signup", signup)
userRouter.post("/login", login)
userRouter.get("/", showUsers)
userRouter.delete("/:id", deleteUser)

export default userRouter
