import React from 'react'
import {render} from 'react-dom'
import App from './App'
import {BrowserRouter} from "react-router-dom" 
import ProfileProvider from './providers/ProfileProvider'

render(
    <BrowserRouter>
        <ProfileProvider>
            <App/>
        </ProfileProvider>
    </BrowserRouter>,    
    document.getElementById('root')
)


