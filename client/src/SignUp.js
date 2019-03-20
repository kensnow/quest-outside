import React from 'react'
import FormHandler from './providers/FormHandler'
import { withProfileProvider } from './providers/ProfileProvider'

function SignUp(props) {

    const inputs = {
        email: props ? props.email : '',
        password: props ? props.password : '',
        username: props ? props.username : ''
    }

    return (
        <FormHandler inputs={inputs} submit={(inputs) => props.signUp(inputs)}>
            {
                ({ handleChange, handleSubmit }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <input onChange={handleChange} type="email" name="email" placeholder="Enter email" />
                            <input onChange={handleChange} type="password" name="password" placeholder="Enter password" />
                            <input onChange={handleChange} type="text" name="username" placeholder="Enter a username" />
                            <button>Submit</button>
                        </form>
                    )
                }
            }
        </FormHandler>
    )
}

export default withProfileProvider(SignUp)
