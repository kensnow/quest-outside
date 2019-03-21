import React from 'react'
import {Route, Redirect} from "react-router-dom"
import {withProfileProvider} from "./ProfileProvider"

function ProtectedRoute(props){
    const{component: Component, ...rest} = props
    return(
        props.token ? 
            <Route {...rest} component={Component} /> :
            <Redirect to="/login" />
    )
}

export default withProfileProvider(ProtectedRoute)