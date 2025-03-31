import { Router } from "express";
import { body } from "express-validator";
import { isMailExists, isUserNameAvailable, getProfile } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/isUserNameAvailable').get([
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('username').isLength({ min: 6 }).withMessage('Username must be at least 6 characters long'),
],
isUserNameAvailable)

router.route('/isMailExists').get(
    body('email').isEmail().withMessage('Email is required')
,
isMailExists)

router.route('/getProfile').get(verifyUser, getProfile)

export default router