const express = require('express')
const objectiveRouter = express.Router()

const Objective = require('../models/objective')

objectiveRouter.route('/')
    .get((req, res, next) => {
        Objective.find()
            .then(objectiveCollection => res.status(200)
            .send(objectiveCollection))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })
    .post((req, res, next) => {
        const objectiveData = req.body
        const objectiveDoc = new Objective(objectiveData)
        objectiveDoc.save()
            .then(savedObjective => res.status(201).send(savedObjective))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })
objectiveRouter.route('/:id')
    .get((req, res, next) => {
        const {id} = req.params
        Objective.findById(id)
            .then(foundObjective => res.status(200).send(foundObjective))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })
    .delete((req, res, next) => {
        const {id} = req.params
        Objective.findByIdAndDelete(id)
            .then(() => res.status(204).send(id + ' Delete Complete'))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })
    .put((req, res, next) => {
        const {id} = req.params
        const updates = req.body
        Objective.findByIdAndUpdate(id, updates, {new:true})
            .then(updatedObjective => res.status(200).send(updatedObjective))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })

    module.exports = objectiveRouter