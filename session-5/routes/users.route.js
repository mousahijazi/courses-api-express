import express from "express";
import { getAllUsers, register, login } from "../controllers/users.controller.js";
import { loginValidation } from "../middleware/usersVaLIdation.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/")
            .get(verifyToken, getAllUsers);

router.route("/register")
            .post(register);


router.route("/login")
            .post(loginValidation, login);

export default router;