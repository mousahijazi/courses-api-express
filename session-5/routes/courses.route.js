import express from "express";
import { getAllCourses, getSingleCourse, updateCourse, addCourse, deleteCourse } from "../controllers/courses.controller.js";
import { coursresSchema } from "../middleware/coursesValidation.js";
import { verifyToken } from "../middleware/verifyToken.js";
import allowedTo from "../middleware/allowedTo.js";
import { userRoles } from "../utils/userRoles.js";

const router = express.Router();

router.route("/")
            .get(getAllCourses)
            .post(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), coursresSchema, addCourse)

router.route("/:courseId")
            .get(getSingleCourse)
            .patch(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), updateCourse)
            .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), deleteCourse)

export default router;