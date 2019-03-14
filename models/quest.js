const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const questSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    reqLevel:{
        type: Number,
        default: 1
    },
    xp:Number,
    description:{
        type: String,
        required:true
    },
    difficulty:{
        type: String,
        enum:['Beginner', 'Easy', 'Moderate', 'Difficult', 'Epic']
    }

})

module.exports = ('Quest', questSchema)