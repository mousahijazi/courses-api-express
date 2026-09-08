import express from "express";
import { getAllCourses, getSingleCourse, updateCourse, addCourse, deleteCourse } from "../controllers/courses.controller.js";
import { coursresSchema } from "../middleware/coursesValidation.js";

const router = express.Router();

router.route("/")
            .get(getAllCourses)
            .post(coursresSchema, addCourse)

router.route("/:courseId")
            .get(getSingleCourse)
            .patch(updateCourse)
            .delete(deleteCourse)

export default router;