import { body } from 'express-validator';

export const coursresSchema = [
    body("title")
        .notEmpty().withMessage("title is require")
        .isLength({min: 2}).withMessage("title at least is 2 digits"),
    body("price")
        .notEmpty().withMessage("price is require")
        .isNumeric().withMessage("price must be a valid number")
];