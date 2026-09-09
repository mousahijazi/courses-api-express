import AppError from "../utils/AppError.js";
import { ERROR } from "../utils/httpStatusText.js";

export default (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.currentUser.role)) {
            const error = AppError.create("this role is not authrized", 401, ERROR)
            return next(error);
        }
        next();
    }
}