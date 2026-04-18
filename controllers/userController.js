import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
const SECRET = "lpu123";
const signup = async (req, res) => {
    try {
        const body = req.body;
        const hashPassword = await bcrypt.hash(body.password, 10);
        body.password = hashPassword;
        const result = await userModel.create(body);
        res.status(201).json({ message: "User Created" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Unable to create user" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const found = await userModel.findOne({ email });
        if (found) {
            const chkPassword = await bcrypt.compare(password, found.password);
            if (chkPassword) {
                const token = jwt.sign({ id: found._id, role: found.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

                res.status(200).json({ message: "Login Success", token });
            } else {
                res.status(400).json({ message: "Invalid password" });
            }
        } else {
            res.status(400).json({ message: "User not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};

const showUsers = async (req, res) => {
    const result = await userModel.find();
    res.status(200).json(result);
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await userModel.findByIdAndDelete(id);
        res.status(200).json({ message: "User Deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};

export { deleteUser, login, showUsers, signup };
