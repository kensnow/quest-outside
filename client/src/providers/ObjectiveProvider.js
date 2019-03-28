import React, { Component, createContext } from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
const userAxios = axios.create()

export const {Provider, Consumer} = createContext()

userAxios.interceptors.reobjective.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})


export default class objectiveProvider extends Component {
    constructor(){
        super();
        this.state = {
            objectives:[],
            errMsg:''
        }
    }

    getObjectives = () => {
        return userAxios.get('/api/objectives')
            .then(res => {
                const {objectives} = res.data
                this.setState({
                    objectives
                })
            })
            .catch(err => {
                this.setState({
                    errMsg:err.response.data.message
                })
                return err
            })
    }

    addObjective = (objectiveDat) => {
        return userAxios.post('/api/objectives', {...objectiveDat})
            .then(res => {
                const {objective} = res.data
                this.setState( ps => {
                    objectives: [...ps.objectives, objective]
                })
            })
            .catch(err => {
                this.setState({
                    errMsg: err.response.data.message
                })
            })
    }

    editObjective = (objectiveDat, id) => {
        return userAxios.put('/api/objectives', {...objectiveDat})
            .then(res => {
                const updatedObjective = res.data
                const foundObjectiveIndex = this.state.objectives.find(objective => objective._id === id).indexOf()
                const updatedObjectiveArr = this.state.objectives.splice(foundObjectiveIndex, 1, updatedObjective)
                this.setState({
                    objectives: updatedObjectiveArr
                })
            })
    }

    deleteObjective = (id) => {
        return userAxios.delete('/api/objectives', id)
            .then(res => {
                const foundDeletedObjectiveIndex = this.state.objectives.find(objective => objective._id === id).indexOf()
                const updatedObjectiveArr = this.state.objectives.splice(foundDeletedObjectiveIndex, 1)
                this.setState({
                    objectives: updatedObjectiveArr
                })
            })
    }

    render() {
        const value = {
            ...this.state
        }
        return (
            <Provider value = {value}>
                {this.props.children}
            </Provider>
        )
    }
}

export const withobjectiveProvider = C => props => (
    <Consumer>
        {containerProps => <C {...props}{...containerProps} />}
    </Consumer>
)