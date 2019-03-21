import React, {useState} from 'react'
import FormHandler from './providers/FormHandler'
import { withProfileProvider } from './providers/ProfileProvider'



function SignUp(props) {

    const [errMsg, setErrMsg] = useState('')

    const inputs = {
        email: props ? props.email : '',
        password: props ? props.password : '',
        confirmPassword: props ? props.confirmPassword : '',
        username: props ? props.username : ''
    }

    const confirmPassword = (psw, confirm) => {
        return psw === confirm ? true : false
    }

    return (
        <FormHandler inputs={inputs} submit={(inputs) => {
            if(confirmPassword(inputs.password, inputs.confirmPassword)){
                props.signUp(inputs)
            } else {
                setErrMsg("Password doesn't match, please try again")
            }}
            }>
            {
                ({ handleChange, handleSubmit }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <input onChange={handleChange} type="email" name="email" placeholder="Enter email" />
                            <input onChange={handleChange} type="text" name="username" placeholder="Enter a username" />
                            <input onChange={handleChange} type="password" name="password" placeholder="Enter password" />
                            <input onChange={handleChange} type="password" name="confirmPassword" placeholder="Confirm password" />

                            <button>Submit</button>
                            {errMsg !== '' ? <h4>{errMsg}</h4> : null}
                        </form>
                    )
                }
            }
        </FormHandler>
    )
}

export default withProfileProvider(SignUp)
