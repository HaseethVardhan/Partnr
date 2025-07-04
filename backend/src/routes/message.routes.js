import { Router } from "express";
import { body } from "express-validator";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { fetchConversations, loadConversation, loadConversationMeta, newMessage } from "../controllers/message.controllers.js";

const router = Router()

router.route('/new-text').post([
    body('receiverId').isString().notEmpty().withMessage('User ID is required'),
    body('conversationId').isString().notEmpty().withMessage('User ID is required'),
    body('text').isString().notEmpty().withMessage("Text can't be empty.")
], verifyUser, newMessage)

router.route('/fetch-conversations').post(verifyUser, fetchConversations)

router.route('/load-conversation/:conversationId').get(verifyUser, loadConversation)

router.route('/conversation-meta/:conversationId').get(verifyUser, loadConversationMeta)

export default router