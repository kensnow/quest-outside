import React from 'react'
import FormHandler from './providers/FormHandler'
import {withProfileProvider} from './providers/ProfileProvider'

function LogIn(props) {

    const inputs = {
        email: props ? props.email : '',
        description: props ? props.password : '',
    }

    return (
        <FormHandler inputs={inputs} submit={(inputs) => props.logIn(inputs)}>
            {
                ({handleChange, handleSubmit}) => {
                    return(
                        <form onSubmit={handleSubmit}>
                            <input onChange={handleChange}type="text" name="email" placeholder="Email"/>
                            <input onChange={handleChange} type="password" name="password" placeholder="password"/>
                            <button>Log In</button>
                        </form>
                    )
                }
            }
        </FormHandler>
    )
}

export default withProfileProvider(LogIn)
