import React from 'react'
import { Link } from 'react-router-dom'
import {withProfileProvider} from './providers/ProfileProvider'

function Header(props) {
    console.log (props)
    const {token} = props
    const {isAdmin, isQuestMaker} = props.user
    return (
        <div>
            <ul>
                <Link to='/'>Home</Link>
                    {token ? 
                    <>
                        <Link to='/dashboard'>Dashboard</Link>
                        <Link to='/quest-maker'>Build A Quest</Link>
                        <button>Log Out</button> 
                    </>
                    : 
                    <>
                        <Link to='/login'>Log In</Link> 
                        <Link to='/signup'>Sign Up</Link>
                    </>}
                
            </ul>
        </div>
    )
}

export default withProfileProvider(Header)   