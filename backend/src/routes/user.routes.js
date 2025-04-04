import { Router } from "express";
import { body } from "express-validator";
import { isMailExists, isUserNameAvailable, getProfile } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/isUserNameAvailable').post([
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('username').isLength({ min: 6 }).withMessage('Username must be at least 6 characters long'),
    body('username').matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain a-z, A-Z, 0-9 and _')
],
isUserNameAvailable)

router.route('/isMailExists').post(
    body('email').isEmail().withMessage('Email is required')
,
isMailExists)

router.route('/getProfile').get(verifyUser, getProfile)

export default router