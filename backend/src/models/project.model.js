import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
})

export const Project = mongoose.model('Project', projectSchema)