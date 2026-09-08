import mongoose from "mongoose";
import validator from "validator";

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
    }
})

export const User = mongoose.model("User", userSchema);