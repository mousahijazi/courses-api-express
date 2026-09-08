import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import coursesRouter from "./routes/courses.route.js";
import usersRouter from "./routes/users.route.js"
import mongoose from "mongoose";
import { ERROR } from "./utils/httpStatusText.js";
import 'dotenv/config';
import cors from "cors";

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB successfully!");
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB Connection Failed:", err.message);
    });

app.use(cors())
app.use(express.json());

app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

app.all("/*splat", (req, res, next) => {
    return res.status(404).json({status: ERROR, message: "this resource is not available"});
})

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({status: error.statusText || error , message: error.message, code: error.statusCode || 500, data: null})
})