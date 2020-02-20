import React from 'react'

export default class FieldStyle extends React.Component {
  componentDidMount () {
    this.ref && this.ref.focus()
  }

  render () {
    const {autoFocus, ...rest} = this.props

    // auto focus
    const ref = autoFocus ? (ref) => { this.ref = ref } : null
    return (
      <input
        ref={ref}
        type="text"
        {...rest}
      />
    )
  }
}