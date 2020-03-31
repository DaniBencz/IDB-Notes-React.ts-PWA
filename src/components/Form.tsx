import React, { useState } from 'react'

const Form = (props: any) => {
  const [title, setTitle] = useState('')
  const [descript, setDescript] = useState('')
  const { addNewNote } = props

  const clearFieldAndSubmit = () => {
    addNewNote(title, descript)
    setTitle('')  // empty input fields
    setDescript('')
  }

  return (
    <>
      <h2>New Note</h2>
      <input id="title" type="text" placeholder="Note Title" value={title} onChange={(e: any) => setTitle(e.target.value)}></input>
      {/* works with onInput too, but throws error in console */}
      <input id="description" type="text" placeholder="Description" value={descript} onChange={(e: any) => setDescript(e.target.value)}></input>
      <button onClick={clearFieldAndSubmit}>Create New Note</button>
    </>
  )
}

export default Form