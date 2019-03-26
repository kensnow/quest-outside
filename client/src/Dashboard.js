import React from 'react'
import {withProfileProvider} from './providers/ProfileProvider'
import {Link} from 'react-router-dom'


function Dashboard(props) {
    const {username, currentLevel, activeQuests} = props.user
    console.log(props)
    return (
        <div>
            <h1>Username:{username}</h1>
            <h3>Current Level:{currentLevel}</h3>
            <Link to='dashboard/edit-profile'>Edit Profile</Link>
        </div>
    )
}

export default withProfileProvider(Dashboard)   
