import React from 'react'
import {Route, Redirect} from "react-router-dom"
import {withProfileProvider} from "./ProfileProvider"
import ProtectedRoute from './ProtectedRoute'

function ProtectedQuestMakerRoute(props){
    const{component: Component, ...rest} = props
    return(
        props.user.isQuestMaker ? 
            <ProtectedRoute {...rest} component={Component} /> :
            <Redirect to="/dashboard" />
    )
}

export default withProfileProvider(ProtectedQuestMakerRoute)