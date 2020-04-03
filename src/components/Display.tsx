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
  const { db } = props

  useEffect(() => {

    if (db) {
      let objectStore = db.transaction('notes_os').objectStore('notes_os')
      objectStore.openCursor().onsuccess = (e: any) => {

        let cursor = e.target.result
        if (cursor) {
          let title = cursor.value.title
          let descr = cursor.value.description
          console.log('title: ', title)
          console.log('descr: ', descr)
          cursor.continue()
        }
      }
    }
  }, [db])  // re-execute if change in db

  return (
    <div id="display">
      <h2>Notes</h2>
      <Note title="my title" description="description"></Note>
      <Note title="foo" description="bar"></Note>
    </div >
  )
}

export default Display