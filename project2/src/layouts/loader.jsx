import React, { Component } from 'react'
import { Spinner } from 'reactstrap'

const style = {
  position: 'absolute',
  margin: 'auto',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 99999
}

const divStyle = {
  position: 'fixed',
  zIndex: 99,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  margin: 'auto',
  background: 'rgba(0,0,0,0.5)',
  width: '100%',
  height: '100%'
}

class Loader extends Component {
  render () {
    return (
      <div style={divStyle}>
        <Spinner style={style} type="border" size="lg" color="success"/>
      </div>
    )
  }
}

export default Loader
