const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('dev'))

//add routes here

app.use('/api/profile', require('./routes/profile'))
app.use('/auth', require('./routes/auth'))

app.use((err, req, res, next) => {
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return(res.send(err.message))
})

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('Connected to MangoDB')
})

app.listen(process.env.PORT, () => (
    console.log('listening on port ' + process.env.PORT)
))