import React, { useEffect } from 'react'

const Note = (props: any) => {

  const deleteNote = () => {
    console.log('delete note')
  }

  return (
    <div id="note">
      <ul>
        <li>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
          <button onClick={deleteNote}>Delete Note</button>
        </li>
      </ul>
    </div>
  )
}

const Display = (props: any) => {
  const { notes_os } = props

  useEffect(() => {
    // render from db

    console.log('notes_os in display: ', notes_os)
  }, [notes_os])

  // adding new entry

  return (
    <div id="display">
      <h2>Notes</h2>
      <Note title="my title" description="description"></Note>
      <Note title="foo" description="bar"></Note>
    </div >
  )
}

export default Display