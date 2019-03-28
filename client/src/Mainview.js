import React from 'react'
import {Switch, Route} from 'react-router-dom'
import LogIn from './LogIn'
import SignUp from './SignUp'
import Home from './Home'
import ProtectedRoute from './providers/ProtectedRoute';
import ProtectedQuestMakerRoute from './providers/ProtectedQuestMakerRoute'
import Dashboard from './Dashboard'
import EditProfile from './EditProfile'
import QuestMaker from './QuestMaker'

function Mainview() {
    return (
        <main>
            <Switch>
                <Route exact path='/'component={Home} />
                <Route path='/login' component={LogIn} />
                <Route path='/signup' component={SignUp} />
                <ProtectedRoute exact path='/dashboard' component={Dashboard}/>
                <ProtectedRoute  path='/dashboard/edit-profile' component={EditProfile}/>
                <ProtectedQuestMakerRoute path='/quest-maker' component={QuestMaker}/>

            </Switch>
        </main>
    )
}

export default Mainview
