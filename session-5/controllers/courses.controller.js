import { validationResult } from "express-validator";
import { Course } from "../models/course.model.js";
import { SUCCESS, FAIL, ERROR } from "../utils/httpStatusText.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import AppError from "../utils/AppError.js";

export const getAllCourses = async (req, res) => {
    const query = req.query;

    const limit = query.limit || 2;
    const page = query.page || 1;
    const skip = (page -1) * limit;
    
    const courses = await Course.find({}, {"__v": false}).limit(limit).skip(skip);
    res.json({status: SUCCESS, data: {courses}});
}

export const getSingleCourse = asyncWrapper(
    async (req, res, next) => {
        const course = await Course.findById(req.params.courseId);
        
        if(!course) {
            const error = AppError.create("course not found!", 404, FAIL);
            return next(error);
        }
        return res.json({status: SUCCESS, data: {course}});
    }
)

export const addCourse = asyncWrapper(
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = AppError.create(errors.array(), 400, FAIL)
            return next(error);
        }

        const newCourse = new Course(req.body);
        await newCourse.save();

        res.status(201).json({status: SUCCESS, data: {course: newCourse}});
    }
)

export const updateCourse = asyncWrapper(
    async (req, res) => {
        const courseId = req.params.courseId;
        const updateCourse = await Course.findByIdAndUpdate(courseId, {$set: {...req.body}}, { new: true });
        return res.json({status: SUCCESS, data: {course: updateCourse}});
    }
)

export const deleteCourse = asyncWrapper(
    async (req, res) => {
        const courseId = req.params.courseId;
        await Course.deleteOne({_id: courseId});
        return res.json({status: SUCCESS, data: null});
    }
)
