import React, { Component } from 'react'

export default class Toggler extends Component {
    constructor(){
        super();
        this.state = {
            on: false
        }
    }

    toggleSwitch = () => {
        this.setState(ps => ({
            on: !ps.on
        }))
    }

    render() {
        const {on} = this.state
        
        return (
            this.props.children({
                on,
                toggleSwitch: this.toggleSwitch
            })
        )
    }
}

export const withToggler = C => props => (
    <Toggler>
        {value => <C {...value}{...props} />}
    </Toggler>
)


