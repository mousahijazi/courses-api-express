import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    }
})

export const Course = mongoose.model("Course", coursesSchema);