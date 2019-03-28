import React, { Component, createContext } from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
export const {Consumer, Provider} = createContext()
const userAxios = axios.create()

//axios interceptor
userAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

class ProfileProvider extends Component {
    constructor(props){
        super(props)
        this.state = {
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
                console.log(res)
                const {user, token} = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                this.setState({
                    token,
                    password: "",
                    user
                }, () => {
                    this.props.history.push('/dashboard')
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
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                this.setState({
                    token,
                    password:"",
                    user
                }, () => {
                    this.props.history.push('/dashboard')
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
        }, () => {
            this.props.history.push('/')
        })
        
    }

    // uploadImage = (userId, imgDat) => {
    //     console.log(userId, imgDat)
    //     return userAxios.post(`/api/profile/${userId}/profileImg`, imgDat)
    //         .then(res => {
    //             console.log(res)
    //             this.updateProfileImg(res.data.filename)})
    //         .catch(err => {
    //             this.setState({
    //                 errMsg:err.response.data.message
    //             })
    //             return err
    //         })
    // }

    // setImg = (e, userId) => {
    //     console.log(e, userId)
    //     if(e.target.files[0]){
            
    //         let data = new FormData()
    //         let file = e.target.files[0]
    //         let fileName = file.name
    //         console.log(file, fileName)
    //         data.append('file', file)
    //         data.append('name', fileName)
    //         console.log(data.entries())
    //         this.uploadImage(userId, data)
    //     }
    // }

    // updateProfileImg = (filename) => {
    //     console.log(filename)
    //     this.setState(ps => ({
    //         user: {
    //             ...ps.user,
    //             profileImg: filename
    //         }
    //     }),
    //         () => localStorage.setItem('user',JSON.stringify(this.state.user))
    //     )
    // }

    render() {
        const value = {
            logIn: this.logIn,
            logOut: this.logOut,
            signUp: this.signUp,
            // setImg: this.setImg,
            // uploadImage: this.uploadImage,
            ...this.state
        }
        return (
            <Provider value = {value}>
                {this.props.children}
            </Provider>
        )
    }
}

export default withRouter(ProfileProvider)

export const withProfileProvider = C => props => (
    <Consumer>
        {containerProps => <C {...containerProps}{...props}/>}
    </Consumer>
)