import React, {useState} from 'react'

import Field from './FieldStyle.jsx'




export default class EditableContainer extends React.Component {
  constructor (props) {
    super(props)

    // init counter
    this.count = 0

    // init state
    this.state = {
      edit: false,
    }
  }

  componentWillUnmount () {
    // cancel click callback
    if (this.timeout) clearTimeout(this.timeout)
  }

  handleClick (e) {
    // cancel previous callback
    if (this.timeout) clearTimeout(this.timeout)

    // increment count
    this.count++

    // schedule new callback  [timeBetweenClicks] ms after last click
    this.timeout = setTimeout(() => {
      // listen for double clicks
      if (this.count === 2) {
        // turn on edit mode
        this.setState({
          edit: true,
        })
      }

      // reset count
      this.count = 0
    }, 250) // 250 ms
  }

  handleBlur (e) {
    // handle saving here
    
    // close edit mode
    this.setState({
      edit: false,
    })
  }

  render () {
    const {children, setDayState, state, id, ...rest} = this.props
    const {edit} = this.state

    if (edit) {
      // edit mode
      return (
        <Field
          autoFocus
          onBlur={this.handleBlur.bind(this)}
          setDayState={setDayState}
          state={state}
          children={children}
          id={id}
          
        />
      )
    } else {
      // view mode
      return (
        <span
          onClick={this.handleClick.bind(this)}
          {...rest}
        >
          {children}
        </span>
      )
    }
  }
}