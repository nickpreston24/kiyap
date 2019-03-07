import React from 'react'
// import Tag from './Tag'

export default function Landing() {
  return (
    <div>
      <h1 style={titleStyle}>Welcome to KIY'APP!</h1>
      <h2 style={textStyle}>Are you a ...</h2>
      {/* <Tag text="Hello"/> */}
      <button>Pro</button>
      <button>Student</button>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, saepe? Odit officia porro architecto maxime hic esse. Aspernatur iusto voluptates tempore odio, eaque adipisci optio distinctio voluptas recusandae molestias beatae!</p>
    </div>
  )
}

const titleStyle = {
    color : '#f54646'
}

const textStyle = {
    color: '#aa99DD'
}