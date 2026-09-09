import mongoose from "mongoose";
import validator from "validator";
import { userRoles } from "../utils/userRoles.js";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validator.isEmail, "filed must be a valid email"]
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    role: {
        type: String,
        enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
        default: userRoles.USER,
    },
    avater: {
        type: String,
        default: "uploads/developer.jpg",
    }
})

export const User = mongoose.model("User", userSchema);