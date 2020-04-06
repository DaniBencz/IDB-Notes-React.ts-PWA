import React, { useEffect, useState } from 'react'

const Note = (props: any) => {
  const { db, note } = props

  const deleteNote = () => {
    db.transaction('notes_os', 'readwrite').objectStore('notes_os').delete(note.id)
    console.log('delete note')
  }

  return (
    <div id="note">
      <ul>
        <li>
          <h3>{note.title}</h3>
          <p>{note.descr}</p>
          <button onClick={deleteNote}>Delete Note</button>
        </li>
      </ul>
    </div>
  )
}

interface Note { id: number, title: string, descr: string }

const Display = (props: any) => {
  const { db } = props
  let [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    setNotes([])  // empty state before beginning to refill it, else we end up with duplicates of old entries
    if (db) {
      let objectStore = db.transaction('notes_os').objectStore('notes_os')
      objectStore.openCursor().onsuccess = (e: any) => {  // iterate over object store entries

        let cursor = e.target.result
        if (cursor) {
          // setNotes([...notes, { title: cursor.value.title, descr: cursor.value.descr }])
          setNotes(prev => [...prev, {
            id: cursor.value.id,
            title: cursor.value.title,
            descr: cursor.value.description
          }])
          cursor.continue() // continue to next iteration
        }
      }
    }
  }, [db])  // no 2nd parameter, re-execute on every render

  return (
    <div id="display">
      <h2>Notes</h2>
      {notes.map((note: Note) => {
        return <Note key={note.id} db={db} note={note}></Note>
      })}
    </div >
  )
}

export default Display