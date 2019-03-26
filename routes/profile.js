const express = require('express')
const profileRouter = express.Router()
const path = require('path')
const multer = require('multer')
const upload = multer({dest: './profileImg/'})

const Profile = require('../models/profile')

profileRouter.route('/')
    .get((req, res, next) => {
        Profile.find()
            .then(profileCollection => res.status(200)
            .send(profileCollection))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })
    .post((req, res, next) => {
        const profileData = req.body
        const profileDoc = new Profile(profileData)
        profileDoc.save()
            .then(savedProfile => res.status(201).send(savedProfile))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })
profileRouter.route('/:id')
    .get((req, res, next) => {
        const {id} = req.params
        Profile.findById(id)
            .then(foundProfile => res.status(200).send(foundProfile))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })
    .delete((req, res, next) => {
        const {id} = req.params
        Profile.findByIdAndDelete(id)
            .then(() => res.status(204).send(id + ' Delete Complete'))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })
    .put((req, res, next) => {
        const {id} = req.params
        const updates = req.body
        Profile.findByIdAndUpdate(id, updates, {new:true})
            .then(updatedProfile => res.status(200).send(updatedProfile))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })

    profileRouter.route('/:id/profileImg',upload.single('file'))
        .post((req, res, next) => {
            const {id} = req.params
            const {file} = req.file
            Profile.findByIdAndUpdate(id, {profileImg: file.filename})
                .then(updatedProfile => res.status(200).send(updatedProfile))
                .catch(err => {
                    res.status(500)
                    next(err)
                })
        })


    profileRouter.route('/:id/profileImg/:imgName')
        .get((req, res) => {
            let filename = req.params.filename
            res.sendFile(path.join(__dirname, 'profileImg', filename))
        })


    module.exports = profileRouter