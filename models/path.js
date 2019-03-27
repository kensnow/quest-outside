const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const pathSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    award:{
        type:objectId,
        ref:'Award'
    },
    quests:[{
        quest:{
            type:objectId,
            ref:'Quest'
        },
        stage: Number
    }]
})