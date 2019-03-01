import React from 'react'
import Tag from './Tag'

export default function Landing() {
  return (
    <div>
      <h1 style={titleStyle}>Welcome to KIY'APP!</h1>
      <h2 style={textStyle}>Are you a ...</h2>
      {/* <Tag text="Hello"/> */}
    </div>
  )
}

const titleStyle = {
    color : '#f54646'
}

const textStyle = {
    color: '#aa99DD'
}
