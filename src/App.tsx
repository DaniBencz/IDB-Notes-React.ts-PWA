import React, { useState } from 'react';
import Form from './components/Form'
import Display from './components/Display'
import useBeforeFirstRender from './beforeRender'
import './App.css';

function App() {
  const [dbs, callDB] = useState<any>()
  const [s_title, updateTitle] = useState<string>()

  const setUpDB = () => {
    // not sure if we really need a Promise
    return new Promise((res, rej) => {

      if ("indexedDB" in window && window.indexedDB !== undefined) {
        const idbf: IDBFactory = window.indexedDB
        const dbName: string = 'pwa_notes_db'
        const request: IDBOpenDBRequest = idbf.open(dbName, 2)

        request.onupgradeneeded = (e: any) => { // runs the very first time, and on version change
          const db = e.target.result
          const objectStore: IDBObjectStore = db.createObjectStore(
            'notes_os', { keyPath: 'id', autoIncrement: true }
          );
          objectStore.createIndex('title', 'title', { unique: false })
          objectStore.createIndex('description', 'description', { unique: false })
          // res('upgraded')  no need to resolve here, onsuccess will get called anyway
        }

        request.onsuccess = (e: any) => { // gets called even if upgrade was done
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

    add.onsuccess = () => {
      updateTitle(title) // get Display to refresh
      console.log('s_title: ', s_title) // undefined at this point
    }
  }

  return (
    <div className="App">
      <h1>IndexedDB with React</h1>
      <Display db={dbs} /* title={s_title} */></Display> {/* db initially is undefined, then state gets updated, and passed to Display*/}
      <Form addNewNote={addNewNote} ></Form>
    </div>
  )
}

export default App
