import React, { useEffect } from 'react'

const Form = () => {

  useEffect(() => { // componentDidMount
    if ("indexedDB" in window && window.indexedDB !== undefined) {

      let idbf: IDBFactory = window.indexedDB
      let dbName: string = 'pwa_notes_db'
      let request: IDBOpenDBRequest
      request = idbf.open(dbName, 3)

      request.onupgradeneeded = (e: any) => {
        console.log('upgrade needed')

        let database: IDBDatabase
        database = e.target.result

        let objectStore: IDBObjectStore = database.createObjectStore(
          'notes_os', { keyPath: 'id', autoIncrement: true }
        );

        objectStore.createIndex('title', 'title', { unique: false })
        objectStore.createIndex('description', 'description', { unique: false })
      }

      request.onerror = function (e: any) {
        console.log('error: ', request.error)
      }
    }
    else {
      alert("No support for indexedDB")
    }
  }, [])

  const addNewNote = () => {
    console.log('new note')
  }

  return (
    <>
      <h2>New Note</h2>
      <input id="title" type="text" placeholder="Note Title"></input>
      <input id="description" type="text" placeholder="Description"></input>
      <button onClick={addNewNote}>Create new note</button>
    </>
  )
}

export default Form