import React from 'react'
import { Link } from 'react-router-dom'


function Header() {
    return (
        <div>
            <ul>
                <Link to='/'>Home</Link>
                <Link to='/login'>Log In</Link>
                <Link to='/signup'>Sign Up</Link>
            </ul>
        </div>
    )
}

export default Header   