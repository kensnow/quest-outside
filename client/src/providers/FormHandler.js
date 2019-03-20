import React, { Component } from 'react'

export default class FormHandler extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputs: props.inputs
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        const {name, value} = e.target
        this.setState(ps => ({
            inputs: {
                ...ps.inputs,
                [name]:value
            }
        }))
    }

    handleSubmit(e){
        e.preventDefault()
        console.log(this.props)
        // this.props.submit(this.state.inputs)
    }

    render() {
        const props = {
            ...this.state,
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit
        }
        return (
                this.props.children(props)
        )
    }
}
