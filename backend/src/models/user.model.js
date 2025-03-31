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
        default: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQUGBAMCB//EADUQAQACAQICBgkDBAMBAAAAAAABAgMEEQUhEjFBUWGRBhMUIzJCVHGBIqHBUnLR4USSsRX/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/DQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATsCE7OzS8M1ep2mmKYpPzW5Qs8Xo9G3vs8791KgoNjZp//g6TaP1Zf+z4yej+nt8GXJXl1TtIM0LjUcB1FI3w2rl8I5Sq8mHJjv0MlJrbukHmAAAAAAAAAAAAAAAAD6pEzaIiN5meUQCceK2S0UpEzaeURDScP4NiwdHJqNr5I7Plr/l7cJ4fGix9PJETmvHOf6Y7o/lYAb8yAAAA+zx1Olw6rH0M9elHZPVMT4S9kAy3E+FX0nva2m+KfmmOcT4q2Y2bq1a3rNb1i1Z66z1Sy3F+HzpM/wCnnivzpO/V4SCtAAAAAAAAAAAAAAXHo9pIz55zXrE1xdXjPYqI7Wu4Ji9Vw3Dy2m8TafHf/WwO4AAAAAAAB4a3Te2aXJgiN7Tzp/d2PcBhL1mtpiY2mJ2mHysuO4vV8SycoiMnvOXj1/vurQAAAAAAAAAAAAT2NzhrFMOOkdVaxHlDDQ3VPgj7A+gAAAAAAAAAZ/0orHrtPO0bzSef5US+9KPi032t/ChAAAAAAAAAAAABMS2XC8vruH4Lb7z0ejP3jl/DGL/0Z1UR09Laecz068/OAXwhIAAAAAAAPjNlrhw3yX+GsbgzfpFl9Zr/AFdZn3dYrO/f1/4VL1z5bZs18l53te3Sl5AAAAAAAAAAAAAPXBlthyVvS21qzvDyAbXRarHq9NGXHy25Wjul0MZoNdl0WaMmOeXzV7LQ1ei1mHWYovinafmrPXUHQAAAABy584jbr8AGd47xCMtvZ8Vv0Vn9cx2y9uLcYiKXwaW3OeVskdkd0M/M7ggAAAAAAAAAAAAAAEgh6Yst8V4vjtato7Yl5gLvS8fvSK11GOLxvzvXlbb7dU/stMPFdFl6s0VnuvGzI7p3Bto1GCY3jNjmP7ofGTW6XFv089I6PXzYvc3579oNPn47pMcT6qL5bdm0bR+6l13FNRq46N5itOytXFuAboE7AgSgAAAAAAAAAABMRu+qVm1orEbzPKI72n4Zwiml95n6N8u3Llyp/sFVoeCZ9TEXyT6rFPVMxzn8LXDwTR4vjrbLPjPJZzzAc0aDSRER7Pj5eB7BpPp8fk6QHN7DpPp8fkmNFpY6tPj8nQA550Okn/j4/JHsGk+nx+TpAc3sOk+nx+R7DpPp8fk6QHN7DpPp8fk8svC9Hkjngisz20nZ3AKHVcA67abLz/pv2/lTZ9PkwXmmWk1tHe2+/PfteOr0uHV4Zx5o37pjrrIMQO3iOhvossUtMWrMb1tHbDiAAAAAAATCHVw3T+1aymKfhn4p7oBccA0EVpGry0jpzPu9+zxXf5n8orEVrEVjaISAAAAAAAAAAAAAADy1OnxavFOPUV3rO+09tZ74Y7Vae+my2x5I2mJ8/s2qp9JcMW0tMsV50vtMx3SDMiUAAAAAmF76NYv1Z820dUVj/wBn+FC1Ho7ToaCbbfFeef2BaQkAAAAAAAAAAAAAAAQ4+M4/WcMzx3R0o/DteeekZcGTHPVasx+wMPKEzExvE9cIAAB//9k=' // need to upload this in cloudinary
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