import React, { Component, createContext } from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
const userAxios = axios.create()

export const {Provider, Consumer} = createContext()

userAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})


export default class QuestProvider extends Component {
    constructor(){
        super();
        this.state = {
            quests:[],
            errMsg:''
        }
    }

    getQuests = () => {
        return userAxios.get('/api/quests')
            .then(res => {
                const {quests} = res.data
                this.setState({
                    quests
                })
            })
            .catch(err => {
                this.setState({
                    errMsg:err.response.data.message
                })
                return err
            })
    }

    addQuest = (questDat) => {
        return userAxios.post('/api/quests', {...questDat})
            .then(res => {
                const {quest} = res.data
                this.setState( ps => {
                    quests: [...ps.quests, quest]
                })
            })
            .catch(err => {
                this.setState({
                    errMsg: err.response.data.message
                })
            })
    }

    editQuest = (questDat, id) => {
        return userAxios.put('/api/quests', {...questDat})
            .then(res => {
                const updatedQuest = res.data
                const foundQuestIndex = this.state.quests.find(quest => quest._id === id).indexOf()
                const updatedQuestArr = this.state.quests.splice(foundQuestIndex, 1, updatedQuest)
                this.setState({
                    quests: updatedQuestArr
                })
            })
    }

    deleteQuest = (id) => {
        return userAxios.delete('/api/quests', id)
            .then(res => {
                const foundDeletedQuest = this.state.quests.find(quest => quest._id === id).indexOf()
                const updatedQuestArr = this.state.quests.splice(foundDeletedQuest, 1)
                this.setState({
                    quests: updatedQuestArr
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

export const withQuestProvider = C => props => (
    <Consumer>
        {containerProps => <C {...props}{...containerProps} />}
    </Consumer>
)