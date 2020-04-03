// https://visualstudiomagazine.com/articles/2016/08/30/storing-data-client-javascript-typescript.aspx
// https://visualstudiomagazine.com/articles/2016/09/01/working-with-indexeddb.aspx

import React, { useState } from 'react';
import Form from './components/Form'
import Display from './components/Display'
import useBeforeFirstRender from './beforeRender'
import './App.css';

function App() {
  const [dbs, callDB] = useState<any>()

  const setUpDB = () => {
    return new Promise((res, rej) => {

      if ("indexedDB" in window && window.indexedDB !== undefined) {
        const idbf: IDBFactory = window.indexedDB
        const dbName: string = 'pwa_notes_db'
        const request: IDBOpenDBRequest = idbf.open(dbName, 2)

        request.onupgradeneeded = (e: any) => { // runs the very first time, and on version change
          callDB(e.target.result)
          const db = e.target.result
          const objectStore: IDBObjectStore = db.createObjectStore(
            'notes_os', { keyPath: 'id', autoIncrement: true }
          );
          objectStore.createIndex('title', 'title', { unique: false })
          objectStore.createIndex('description', 'description', { unique: false })
          res('upgraded')
        }

        request.onsuccess = (e: any) => {
          callDB(e.target.result)
          res('db request success')
        }

        request.onerror = (e: any) => console.log('error: ', request.error)
      }
      else alert("IndexedDB is not supported")
    })
  }

  useBeforeFirstRender(() => {  // unlike useEffect, this will run before the first render
    setUpDB().then(res => {
      console.log(res)
      console.log('db before render: ', dbs)
    })
  })

  const addNewNote = (title: string, descript: string) => {
    console.log('db in add new', dbs)

    const transaction = dbs.transaction('notes_os', 'readwrite')
    const objectStore = transaction.objectStore('notes_os')
    const add = objectStore.add({ title: title, description: descript })  // update with state values

    // get Display to refresh

    add.onsuccess = () => console.log('success adding')
  }

  return (
    <div className="App">
      <h1>IndexedDB with React</h1>
      <Display db={dbs}></Display> {/* db initially is undefined, then state gets updated, and passed to Display*/}
      <Form addNewNote={addNewNote} ></Form>
    </div>
  )
}

export default App;
