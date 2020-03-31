// https://visualstudiomagazine.com/articles/2016/08/30/storing-data-client-javascript-typescript.aspx
// https://visualstudiomagazine.com/articles/2016/09/01/working-with-indexeddb.aspx

import React, { useEffect, useRef } from 'react';
import Form from './components/Form'
import Display from './components/Display'
import './App.css';

function App() {
  let db: any = useRef()

  useEffect(() => { // componentDidMount
    if ("indexedDB" in window && window.indexedDB !== undefined) {

      const idbf: IDBFactory = window.indexedDB
      const dbName: string = 'pwa_notes_db'
      const request: IDBOpenDBRequest = idbf.open(dbName, 2)

      request.onupgradeneeded = (e: any) => { // runs the very first time, and on version change
        db.current = e.target.result
        const objectStore: IDBObjectStore = db.current.createObjectStore(
          'notes_os', { keyPath: 'id', autoIncrement: true }
        );
        objectStore.createIndex('title', 'title', { unique: false })
        objectStore.createIndex('description', 'description', { unique: false })
        console.log('upgrade')
      }

      request.onsuccess = (e: any) => {
        db.current = e.target.result
        console.log('db.current in success', db.current)
      }

      request.onerror = (e: any) => console.log('error: ', request.error)
    }
    else alert("IndexedDB is not supported")
  }, [])

  const addNewNote = (title: string, descript: string) => {
    console.log('db.current in add new', db.current)

    const transaction = db.current.transaction('notes_os', 'readwrite')
    const objectStore = transaction.objectStore('notes_os')
    const add = objectStore.add({ title: title, description: descript })  // update with state values

    add.onsuccess = () => console.log('success adding')
  }

  return (
    <div className="App">
      <h1>IndexedDB with React</h1>
      <Display db={db.current}></Display>
      <Form addNewNote={addNewNote} ></Form>
    </div>
  )
}

export default App;
