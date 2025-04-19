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
        default: "https://res.cloudinary.com/dbzcsfi3e/image/upload/v1743434367/default_pfp_wngp1j.jpg"
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

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAuthToken = async function(){
    const token = await jwt.sign({_id: this._id}, process.env.JWT_TOKEN_SECRET, {expiresIn: '10d'})
    return token
}

export const User = mongoose.model('User', userSchema)