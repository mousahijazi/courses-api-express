import asyncWrapper from "../middleware/asyncWrapper.js";
import { SUCCESS, ERROR, FAIL } from "../utils/httpStatusText.js";
import { User } from "../models/users.model.js";
import { validationResult } from "express-validator";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";
import generateJWT from "../utils/generateJWT.js";

export const getAllUsers = async (req, res) => {
    const query = req.query;

    const limit = query.limit || 2;
    const page = query.page || 1;
    const skip = (page -1) * limit;
    
    const users = await User.find({}, {"__v": false, "password": false}).limit(limit).skip(skip);
    res.json({status: SUCCESS, data: {users}});
}

export const register = asyncWrapper(
    async (req, res, next) => {
        const {firstName, lastName, email, password} = req.body;
        
        const oldUser = await User.findOne({email: email});
        if (oldUser) {
            const error = AppError.create("user already exists!", 400, FAIL);
            return next(error);
        }

        const hashedUser = await bcrypt.hash(password, 14);

        const newUser = new User({
            firstName, 
            lastName, 
            email, 
            password: hashedUser
        });
        await newUser.save();

        const token = await generateJWT({email: email, id: newUser._id});
        newUser.token = token;

        res.status(201).json({status: SUCCESS, data: {user: newUser}})
    }
)

export const login = asyncWrapper(
    async (req, res, next) => {
        const {email, password} = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = AppError.create(errors.array(), 400, FAIL)
            return next(error);
        }

        const user = await User.findOne({email: email});
        if (!user) {
            const error = AppError.create("Email or password is incorrect", 401, FAIL);
            return next(error);
        }

        const matchedPassword = await bcrypt.compare(password, user.password);

        if (user && matchedPassword) {
            const token = await generateJWT({email: user.email, id: user._id});

            return res.json({status: SUCCESS, data: {token}});
        } else {
            const error = AppError.create("somthing wrong", 500, ERROR);
            return next(error);
        }
    }
)