const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const questSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reqLevel: {
        type: Number,
        default: 1
    },
    xp: Number,
    imgRef:String,
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Easy', 'Moderate', 'Difficult', 'Epic']
    },
    objectives: [{
        type: objectId,
        ref: 'Objective'
    }]

})

module.exports = ('Quest', questSchema)