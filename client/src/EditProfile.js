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

    return (
        <>
        {/* first render profile image */}
        <FormHandler input={profileInputs} submit={(profileInputs) => {
            props.setImg(props.user._id, profileInputs)
            }}>
            {
                ({handleChange, handleSubmit}) => {
                    return (
                        <form action={`/${props.user._id}/images`} enctype='multipart/form-data' method='POST'onSubmit={handleSubmit}>
                            <input type="file" name='profile-pic' onChange={(e) => props.setImg(e)}/>
                            <input type="submit" placeholder='Select a picture'/>
                        </form>
                    )
                }

            }

        </FormHandler>
        {/* then render remaining profile data */}


        </>
    )
}

export default withProfileProvider(EditProfile)
