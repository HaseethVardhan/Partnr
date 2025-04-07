import mongoose from 'mongoose'

const workSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    from: {
        type: Date,
        required: true,
    },
    to: {
        type: Date,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
})

export const Work = mongoose.model('Work', workSchema)