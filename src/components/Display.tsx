import React, { useEffect, useState } from 'react'
import Note from './Note'

const Display = (props: { db: any }) => {
  const { db } = props
  let [notes, setNotes] = useState<Note[]>([])
  let [reRender, setReRender] = useState<number>(1)

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
  }, [db, reRender])  // if no 2nd (array) parameter, re-executes on every render

  const updateDisplay = () => {
    setReRender(reRender === 1 ? 2 : 1)
  }

  return (
    <div id="display">
      {notes.length > 0 ? null : <h4>Your notes will appear here</h4>}
      <ul>
        {notes.map((note: Note) => {
          return <Note key={note.id} db={db} note={note} updateDisplay={updateDisplay}></Note>
        })}
      </ul>
    </div >
  )
}

export default Display