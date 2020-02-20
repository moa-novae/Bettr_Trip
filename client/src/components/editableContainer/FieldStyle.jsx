import React from 'react'

export default class FieldStyle extends React.Component {
  componentDidMount () {
    this.ref && this.ref.focus()
  }

  render () {
    const {autoFocus, state, id, children, setDayState, ...rest} = this.props

    // auto focus
    const ref = autoFocus ? (ref) => { this.ref = ref } : null
    return (
      <input
        placeholder="Enter Some Activities"
        //update state on input change
        onChange={(e) => 
          {const text = e.target.value
            setDayState(prev => {
          let newState = {...prev}
          newState.tasks[id].activity = text
          return newState
        })}}
        value={children || ''}
        ref={ref}
        type="text"
        {...rest}
      />
    )
  }
}