import { Router } from "express";
import { body } from "express-validator";
import { isMailExists, isUserNameAvailable, getProfile, registerUser, updateProfession, updateSkills, updateBio, updateLinks, updateProjects, updateWork, updatePicture, getUserPicture, updatePreferences, findUserByEmail, login, suggestedUsers, fetchUserDetailsForProfile, newConnection, fetchSelfDetails, updateAllDetails, acceptConnection, rejectConnection, disconnect, swipeRight, swipeLeft, updateSocketId, fetchNotifications, viewConnections, viewLikes, getPreferences, getUserSkills } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

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

router.route('/register-user').post([
    body('email').isEmail().withMessage('Email is required'),
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('username').isLength({ min: 6 }).withMessage('Username must be at least 6 characters long'),
    body('username').matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain a-z, A-Z, 0-9 and _'),
    body('authtype').isString().notEmpty().withMessage('Auth type is required'),
    // body('fullname').isObject().notEmpty().withMessage('Full name is required'),
],
registerUser)

router.route('/update-user-profession').post([
    body('profession').isString().notEmpty().withMessage('Profession is required'),
], verifyUser, updateProfession)

router.route('/update-user-skills').post([
    body('skills').isArray().notEmpty().withMessage('Skills are required'),
], verifyUser, updateSkills)

router.route('/update-user-bio').post([
    body('bio').isString().notEmpty().withMessage('Bio is required'),
], verifyUser, updateBio)

router.route('/update-user-links').post(verifyUser, updateLinks)

router.route('/update-user-project').post([
    body('title').isString().notEmpty().withMessage('Project title is required'),
    body('details').isString().notEmpty().withMessage('Project description is required'),
], verifyUser, updateProjects)

router.route('/update-user-work').post([
    body('company').isString().notEmpty().withMessage('Company name is required'),
    body('role').isString().notEmpty().withMessage('Position is required'),
    body('experience').isString().notEmpty().withMessage('Duration is required'),
    body('from').isDate().notEmpty().withMessage('Start date is required'),
    body('to').isDate().notEmpty().withMessage('End date is required'),
], verifyUser, updateWork)
 
router.route('/update-user-picture').post(verifyUser, upload.single('picture') ,updatePicture)

router.route('/update-user-preferences').post([
    body('preferences').isArray().notEmpty().withMessage('Preferences are required'),
], verifyUser, updatePreferences)

router.route('/get-user-picture').get(verifyUser, getUserPicture)

router.route('/find-user-by-email').post(findUserByEmail)

router.route('/login').post([
    body('email').isEmail().withMessage('Email is required'),
    body('password').isString().withMessage('Password is required')
],login)

router.route('/suggested-users').post(verifyUser, suggestedUsers)

router.route('/fetch-user-details-for-profile').post([
    body('userId').isString().notEmpty().withMessage('User ID is required')
], verifyUser, fetchUserDetailsForProfile)

router.route('/new-connection').post([
    body('userId').isString().notEmpty().withMessage('User ID is required')
], verifyUser, newConnection)

router.route('/accept-connection').post([
    body('userId').isString().notEmpty().withMessage('User ID is required')
], verifyUser, acceptConnection)

router.route('/reject-connection').post([
    body('userId').isString().notEmpty().withMessage('User ID is required')
], verifyUser, rejectConnection)

router.route('/disconnect-connection').post([
    body('userId').isString().notEmpty().withMessage('User ID is required')
], verifyUser, disconnect)

router.route('/swipe-right').post([
    body('userId').isString().notEmpty().withMessage('User ID is required')
], verifyUser, swipeRight)

router.route('/swipe-left').post([
    body('userId').isString().notEmpty().withMessage('User ID is required')
], verifyUser, swipeLeft)

// router.route('/bookmark').post([
//     body('userId').isString().notEmpty().withMessage('User ID is required')
// ], verifyUser, bookmark)

router.route('/fetch-self-details').post(verifyUser, fetchSelfDetails)

router.route('/update-all-details').post(verifyUser, updateAllDetails)

router.route('/update-socket-id').post(verifyUser, updateSocketId)

router.route('/fetch-notifications').post(verifyUser, fetchNotifications)

router.route('/view-connections').post(verifyUser, viewConnections)

router.route('/view-likes').post(verifyUser, viewLikes)

router.route('/get-preferences').post(verifyUser, getPreferences)

router.route('/get-user-skills').post(verifyUser, getUserSkills)

export default router