const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId
const bcrypt = require('bcrypt')

const states = ['AK','AL','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

const profileSchema = new mongoose.Schema({
    email:{
        type:String,
        trim: true,
        unique:true,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    password: {
        type:String,
        required: true
    },
    currentLevel: {
        type: Number,
        default: 1
    },
    xp:{
        type: Number,
        default:0
    },
    activeQuests:[{
        quest:{
            type:objectId,
            ref:'Quest'
        },
        acceptedOn:{
            type:Date,
            default: Date.now
        }
    }],
    location:{
        state:{
            type:String,
            enum:states
        }, 
        unlockedAreas:{
            type:[objectId],
            ref:'Area'
        }
            
    }

})

profileSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return next()
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return next (err)
        user.password = hash
        next()
    })
})

profileSchema.methods.checkPassword = function(passwordAttempt, cb){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err){
            return cb(err)
        } else {
            cb(null, isMatch)
        }
    })
}

//remove profile/user keys before sending back object.  Taken as args in auth route
profileSchema.methods.withoutKeys = function(...keys){
    const user = this.toObject()
    keys.forEach(el => {
        delete user[el]
    })
    return user
}

module.exports = mongoose.model('Profile', profileSchema)