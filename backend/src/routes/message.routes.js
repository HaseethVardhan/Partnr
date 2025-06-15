import { Router } from "express";
import { body } from "express-validator";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { newMessage } from "../controllers/message.controllers.js";

const router = Router()

router.route('/new-text').post([
    body('userId').isString().notEmpty().withMessage('User ID is required'),
    body('text').isString().notEmpty().withMessage("Text can't be empty.")
], verifyUser, newMessage)

export default router