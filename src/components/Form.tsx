import React, { useState } from 'react'

const Form = (props: any) => {
  // useRef instead ?
  const [title, setTitle] = useState('')
  const [descript, setDescript] = useState('')
  const { addNewNote, installButton, installPWA } = props

  const clearFieldAndSubmit = () => {
    addNewNote(title, descript)
    setTitle('')  // empty input fields
    setDescript('')
  }

  return (
    <div id="form">
      <h2>New Note</h2>
      <label> {/* Accessibility optimasition requires a string here*/}
        <input id="title" type="text" placeholder="Note Title" value={title}
          onChange={(e: any) => setTitle(e.target.value)}></input>
      </label>
      {/* works with onInput too, but throws error in console */}
      <label>
        <input id="description" type="text" placeholder="Description" value={descript}
          onChange={(e: any) => setDescript(e.target.value)}></input>
      </label>
      <button id="create" onClick={clearFieldAndSubmit}>Create New Note</button>
      {/* '&&' for inline conditional rendering */}
      {installButton === true && <button id="install" onClick={installPWA}>Install Application</button>}
    </div>
  )
}

export default Form