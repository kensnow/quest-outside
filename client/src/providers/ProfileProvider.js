import React, { Component, createContext } from 'react'
import axios from 'axios'

export const {Consumer, Provider} = createContext()
const userAxios = axios.create()

//axios interceptor
userAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default class ProfileProvider extends Component {
    constructor(){
        super()
        this.setState = {
            email:"",
            password:"",
            errMsg:"",
            token:localStorage.getItem("token") || "",
            user:JSON.parse(localStorage.getItem("user")) || {}
        }
    }

    logIn = (userDat) => {
        //get profile function tied to login/signup
        return userAxios.post('/auth/login',{
            ...userDat
        })
            .then(res => {
                const {user, token} = res.datalocalStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                this.setState({
                    token,
                    password: "",
                    user
                })
                return res
            })
    }

    signUp = (userDat) => {
        return userAxios.post('/auth/signup',{
            ...userDat
        })
            .then(res => {
                const {user, token} = res.data
                this.setState({
                    token,
                    password:"",
                    user
                })
                return res
            })
            .catch(err => {
                this.setState({
                    errMsg:err.response.data.message
                })    
                return err
            })
    }
    
    logOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        this.setState({
            email:'',
            password:'',
            user:'',
            token:''
        },() => {
            this.props.history.push('/')
        })
    }


    render() {
        const value = {
            logIn: this.logIn,
            logOut: this.logOut,
            signUp: this.signUp,
            ...this.state
        }
        return (
            <Provider value = {value}>
                {this.props.children}
            </Provider>
        )
    }
}


export const withProfileProvider = C => props => (
    <Consumer>
        {containerProps => <C {...containerProps}{...props}/>}
    </Consumer>
)