import React, { useState } from 'react'

const Form = (props: any) => {
  // useRef instead ?
  const [title, setTitle] = useState('')
  const [descript, setDescript] = useState('')
  const { addNewNote, install } = props

  const clearFieldAndSubmit = () => {
    addNewNote(title, descript)
    setTitle('')  // empty input fields
    setDescript('')
  }

  const installPWA = () => {
    alert('good for you!')
  }

  return (
    <div id="form">
      <h2>New Note</h2>
      <input id="title" type="text" placeholder="Note Title" value={title} onChange={(e: any) => setTitle(e.target.value)}></input>
      {/* works with onInput too, but throws error in console */}
      <input id="description" type="text" placeholder="Description" value={descript} onChange={(e: any) => setDescript(e.target.value)}></input>
      <button id="create" onClick={clearFieldAndSubmit}>Create New Note</button>
      <button id="install" onClick={installPWA}>Install Application</button>
    </div>
  )
}

export default Form