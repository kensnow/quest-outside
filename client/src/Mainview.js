import React from 'react'
import {Switch, Route} from 'react-router-dom'
import LogIn from './LogIn'
import SignUp from './SignUp'
import Home from './Home'
import ProtectedRoute from './providers/ProtectedRoute';
import Dashboard from './Dashboard'
import EditProfile from './EditProfile'

function Mainview() {
    return (
        <main>
            <Switch>
                <Route exact path='/'component={Home} />
                <Route path='/login' component={LogIn} />
                <Route path='/signup' component={SignUp} />
                <ProtectedRoute exact path='/dashboard' component={Dashboard}/>
                <ProtectedRoute  path='/dashboard/edit-profile' component={EditProfile}/>
            </Switch>
        </main>
    )
}

export default Mainview
