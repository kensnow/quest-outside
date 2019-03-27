import React from 'react'
import FormHandler from './providers/FormHandler'
import {withProfileProvider} from './providers/ProfileProvider'

function EditProfile(props) {

    const profileInputs = {
        profileImg: props? props.profileImg : 'loading'
    }

    const inputs = {
        username: props ? props.username : 'loading',
        password: ''
    }
    console.log(props)

    return (
        <>
        {/* first render profile image */}
        <FormHandler input={profileInputs} submit={(profileInputs) => {
            props.setImg(props.user._id, profileInputs)
            }}>
            {
                ({handleChange, handleSubmit}) => {
                    return (
                        <div>
                            <input type="file" name='profile-pic' id="profile-pic" onChange={(e) => props.setImg(e, props.user._id)}/>
                            <input type="submit" placeholder='Select a picture'/>
                        </div>
                    )
                }

            }

        </FormHandler>
        {/* then render remaining profile data */}


        </>
    )
}

export default withProfileProvider(EditProfile)
