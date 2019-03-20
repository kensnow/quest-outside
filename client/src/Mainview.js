import React from 'react'
import {Switch, Route} from 'react-router-dom'
import LogIn from './LogIn'
import SignUp from './SignUp'
import Home from './Home'

function Mainview() {
    return (
        <main>
            <Switch>
                <Route exact path='/'component={Home} />
                <Route path='/login' component={LogIn} />
                <Route path='/signup' component={SignUp} />
                
            </Switch>
        </main>
    )
}

export default Mainview
