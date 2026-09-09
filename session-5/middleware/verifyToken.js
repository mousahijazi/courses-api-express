import jwt from "jsonwebtoken";
import { ERROR } from "../utils/httpStatusText.js";
import AppError from "../utils/AppError.js";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["Authorization"] || req.headers["authorization"];
    if (!authHeader) {
        const error = AppError.create("token is required", 401, ERROR);
        return next(error);
    }

    const token = authHeader.split(" ")[1];

    try {
        const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.currentUser = currentUser;

        return next();
    } catch (err) {
        const error = AppError.create("invalid token", 401, ERROR)
        return next(error);
    }
}