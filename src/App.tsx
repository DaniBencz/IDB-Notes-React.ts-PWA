// https://visualstudiomagazine.com/articles/2016/08/30/storing-data-client-javascript-typescript.aspx
// https://visualstudiomagazine.com/articles/2016/09/01/working-with-indexeddb.aspx

import React, { useState } from 'react';
import Form from './components/Form'
import Display from './components/Display'
import useBeforeFirstRender from './beforeRender'
import './App.css';

function App() {
  const [dbs, callDB] = useState<any>() // needed for addNewNote, useRef didn't work...
  const [notes_os, updateNotes] = useState<any>() // needed to trigger re-render of Display component

  const setUpDB = () => {
    return new Promise((res, rej) => {

      if ("indexedDB" in window && window.indexedDB !== undefined) {
        const idbf: IDBFactory = window.indexedDB
        const dbName: string = 'pwa_notes_db'
        const request: IDBOpenDBRequest = idbf.open(dbName, 2)

        request.onupgradeneeded = (e: any) => { // runs the very first time, and on version change
          const db = e.target.result  // an instance to use immediately
          callDB(db)  // useState is async, without callback, can't wait for it to finish...
          updateNotes(db.createObjectStore(
            'notes_os', { keyPath: 'id', autoIncrement: true }
          ))
          notes_os.createIndex('title', 'title', { unique: false })
          notes_os.createIndex('description', 'description', { unique: false })
          res('upgraded')
        }

        request.onsuccess = (e: any) => {
          const db = e.target.result
          callDB(db)
          const transaction = db.transaction('notes_os', 'readwrite')
          updateNotes(transaction.objectStore('notes_os'))
          res('success')
        }

        request.onerror = (e: any) => rej(e)
      }
      else alert("IndexedDB is not supported")
    })
  }

  useBeforeFirstRender(() => {  // unlike useEffect, this will run before the first render
    setUpDB().then(res => {
      console.log('resolved: ', res, ', db before render: ', dbs)
    }).catch(rej => console.log(rej))
  })

  const addNewNote = (title: string, descript: string) => {
    console.log('db in add new: ', dbs)

    const transaction = dbs.transaction('notes_os', 'readwrite')
    const objectStore = transaction.objectStore('notes_os')
    updateNotes(objectStore)  // triggering Display component update

    const add = objectStore.add({ title: title, description: descript })
    add.onsuccess = () => console.log('success adding')
  }

  return (
    <div className="App">
      <h1>IndexedDB with React</h1>
      <Display notes_os={notes_os}></Display> {/* db initially is undefined, then state gets updated, and passed to Display*/}
      <Form addNewNote={addNewNote} ></Form>
    </div>
  )
}

export default App;
