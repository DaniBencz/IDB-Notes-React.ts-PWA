import React from 'react'

interface Note { id: number, title: string, descr: string }

const Note = (props: { db: any, note: Note, updateDisplay: () => void }) => {
  const { db, note, updateDisplay } = props

  const deleteNote = () => {
    const transaction = db.transaction('notes_os', 'readwrite')
    transaction.objectStore('notes_os').delete(note.id)
    transaction.oncomplete = () => updateDisplay()
  }

  return (
    <li id="note">
      <h3>{note.title}</h3>
      <button onClick={() => deleteNote()}>Delete</button>
      <p>{note.descr}</p>
    </li>
  )
}
export default Note