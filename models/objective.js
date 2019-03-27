const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const objectiveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    xp: {
        type: Number,
        defaut: 5
    },
    description: {
        type: String,
        required: true
    },
    relatedQuests: [{
        type: objectId,
        ref: 'Quest'
    }],
    imgRef:String,
    elevation:Number,
    trailHeads: [{
        name: String,
        location: String,
        distance: Number,
        elevationStart: Number

    }]

})

module.exports = ('Objective', objectiveSchema)