import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    fullname: {
        firstname: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        trim: true
    },
    authtype: {
        type: String,
        enum: ['local', 'google', 'github'],
        default: 'local',
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    links: {
        xlink: {
            type: String,
            optional: true,
        },
        linkedInlink: {
            type: String,
            optional: true,
        },
        portfoliolink: {
            type: String,
            optional: true,
        }
    },
    profilePicture: {
        type: String,
        default: 'default.jpg' //need to find a default image online
    },
    profession: {
        type: String,
        default: 'student' // need to rethink this what should be the default value
    },
    preferences: {
        type: [String],
        default: []
    },
    conversationsArray: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation'
        }
    ],
    connectionsArray: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Connection'
        }
    ],
    likesArray: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    bookmarksArray: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    notificationsArray: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notification'
        }
    ],
    status: {
        type: String,
        enum: ['active', 'inactive'], // inactive is for deactivated users
        default: 'active'
    },
    about: {
        type: String,
        optional: true,
    },
    workArray: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Work'
        }
    ],
    projectsArray: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }
    ],
    socketId: {
        type: String,
        optional: true // need to change this
    },
},{
    timestamps: true,
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model('User', userSchema)