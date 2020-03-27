import React, { useState, useEffect } from 'react'


const Form = () => {
  const [title, setTitle] = useState('')

  useEffect(() => { // componentDidMount
    if ("indexedDB" in window && window.indexedDB !== undefined) {

      const idbf: IDBFactory = window.indexedDB
      const dbName: string = 'pwa_notes_db'
      const request: IDBOpenDBRequest = idbf.open(dbName, 1)

      request.onupgradeneeded = (e: any) => {
        const db = e.target.result
        const objectStore: IDBObjectStore = db.createObjectStore(
          'notes_os', { keyPath: 'id', autoIncrement: true }
        );
        objectStore.createIndex('title', 'title', { unique: false })
        objectStore.createIndex('description', 'description', { unique: false })
      }

      request.onerror = (e: any) => {
        console.log('error: ', request.error)
      }
    }
    else {
      alert("No support for indexedDB")
    }
  }, [])

  const addNewNote = () => {
    const request = window.indexedDB.open('pwa_notes_db')

    request.onsuccess = (e: any) => {
      const db = e.target.result
      const transaction = db.transaction('notes_os', 'readwrite')
      const objectStore = transaction.objectStore('notes_os')
      const add = objectStore.add({ title: { title }, description: 'descr1' })

      add.onsuccess = () => {
        console.log('success')
      }
    }

    request.onerror = (e: any) => {
      console.log('error: ', request.error)
    }
  }

  return (
    <>
      <h2>New Note</h2>
      <input id="title" type="text" placeholder="Note Title" value={title} onInput={(e: any) => setTitle(e.target.value)}></input>
      <input id="description" type="text" placeholder="Description"></input>
      <button onClick={addNewNote}>Create New Note</button>
    </>
  )
}

export default Form