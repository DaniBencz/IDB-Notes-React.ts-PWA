import React, { useState, useRef } from 'react';
import Form from './components/Form'
import Display from './components/Display'
import useBeforeFirstRender from './beforeRender'
import './App.css';

const App = () => {
  let promptEvent: any = useRef()
  const [dbs, setDbs] = useState<any>()
  const [installButton, setInstallButton] = useState(false)
  let dbName = useRef('pwa_notes_db')

  const setUpDB = () => {
    return new Promise((res, rej) => {
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
          res('db setup successfull')
        }

        request.onerror = (e: any) => res(request.error)
      }
      else alert("IndexedDB is not supported")
    })
  }

  useBeforeFirstRender(async () => {  // unlike useEffect, this will run before the first render
    let result = await setUpDB()  // no real need, just experimenting here
    console.log(result)

    window.addEventListener('beforeinstallprompt', (e) => {
      promptEvent.current = e // capture event to trigger later
      setInstallButton(true)
    })
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

  const installPWA = () => {
    promptEvent.current.prompt()
    promptEvent.current.userChoice
      .then((result: any) => { if (result.outcome === 'accepted') alert('Happy Noting!') })
    setInstallButton(false)
  }

  if (!dbs) return null // if no db access, no point rendering
  return (
    <div className="App">
      <div id="header">
        <h1>Notes </h1><h3>- PWA with React and IDB</h3>
      </div>
      <Display db={dbs}></Display>
      <Form addNewNote={addNewNote} installButton={installButton} installPWA={installPWA}></Form>
    </div>
  )
}

export default App
