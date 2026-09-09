import express from "express";
import { getAllUsers, register, login } from "../controllers/users.controller.js";
import { loginValidation } from "../middleware/usersValidation.js";
import { verifyToken } from "../middleware/verifyToken.js";
import AppError from "../utils/AppError.js";
import { FAIL } from "../utils/httpStatusText.js";
import multer from "multer";

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
})

const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split("/")[0];

    if(imageType === "image") {
        return cb(null, true);
    } else {
        return cb(AppError.create("the file most be an image", 400, FAIL), false)
    }
}
const upload = multer({storage: diskStorage, fileFilter});

const router = express.Router();

router.route("/")
            .get(verifyToken, getAllUsers);

router.route("/register")
            .post(upload.single("avater"), register);


router.route("/login")
            .post(loginValidation, login);

export default router;