import React, { useState, useRef } from 'react';
import Form from './components/Form'
import Display from './components/Display'
import useBeforeFirstRender from './beforeRender'
import './App.css';

const App = () => {
  const [dbs, setDbs] = useState<any>()
  let dbName = useRef('pwa_notes_db')

  const initDB = async () => {

    const setUpDB = new Promise((res, rej) => {
      if ("indexedDB" in window && window.indexedDB !== undefined) {
        const idbf: IDBFactory = window.indexedDB
        const request: IDBOpenDBRequest = idbf.open(dbName.current, 2)
  
        request.onupgradeneeded = (e: any) => { // runs the very first time, and on version change
          const db = e.target.result
          const objectStore: IDBObjectStore = db.createObjectStore(
            'notes_os', { keyPath: 'id', autoIncrement: true }
          );
          objectStore.createIndex('title', 'title', { unique: false })
          objectStore.createIndex('description', 'description', { unique: false })
          // res('upgraded')  no need to resolve here, onsuccess will get called anyway
        }
  
        request.onsuccess = (e: any) => { // gets called even if upgrade was called
          setDbs(e.target.result)
          res('db request success')
        }
  
        request.onerror = (e: any) => res(request.error)
      }
      else alert("IndexedDB is not supported")
    })
    
    return await setUpDB
  }

  useBeforeFirstRender(() => {  // unlike useEffect, this will run before the first render
    console.log(initDB())
  })

  const addNewNote = (title: string, descript: string) => {
    console.log('db in add new', dbs)

    const transaction = dbs.transaction('notes_os', 'readwrite')
    const objectStore = transaction.objectStore('notes_os')
    const add = objectStore.add({ title: title, description: descript })  // update with state values

    add.onsuccess = () => {
      window.indexedDB.open(dbName.current).onsuccess = (e: any) => {
        setDbs(e.target.result) // need to re-set dbs in order to trigger Display render
      }
    }
  }

  return (
    <div className="App">
      <h1>IndexedDB with React</h1>
      <Display db={dbs}></Display> {/* db initially is undefined, then state gets updated, and passed to Display*/}
      <Form addNewNote={addNewNote} ></Form>
    </div>
  )
}

export default App
