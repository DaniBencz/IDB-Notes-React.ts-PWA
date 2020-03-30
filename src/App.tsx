// https://visualstudiomagazine.com/articles/2016/08/30/storing-data-client-javascript-typescript.aspx
// https://visualstudiomagazine.com/articles/2016/09/01/working-with-indexeddb.aspx

import React, { useEffect, useRef } from 'react';
import Form from './components/Form'
import './App.css';

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
    console.log('display ok')
  }, [db])

  return (
    <div id="display">
      <h2>Notes</h2>
      <Note title="my title" description="description"></Note>
      <Note title="foo" description="bar"></Note>
    </div >
  )
}

function App() {
  let db: any = useRef()

  useEffect(() => { // componentDidMount
    if ("indexedDB" in window && window.indexedDB !== undefined) {

      const idbf: IDBFactory = window.indexedDB
      const dbName: string = 'pwa_notes_db'
      const request: IDBOpenDBRequest = idbf.open(dbName, 2)

      request.onupgradeneeded = (e: any) => { // runs the very first time, and on version change
        console.log('upgrade')
        db.current = e.target.result
        const objectStore: IDBObjectStore = db.current.createObjectStore(
          'notes_os', { keyPath: 'id', autoIncrement: true }
        );
        objectStore.createIndex('title', 'title', { unique: false })
        objectStore.createIndex('description', 'description', { unique: false })
      }

      request.onsuccess = (e: any) => {
        db.current = e.target.result
        //console.log('event result:', e.target.result) ok
        console.log('db.current in success', db.current)
      }
      
      request.onerror = (e: any) => {
        console.log('error: ', request.error)
      }
    }
    else alert("No support for indexedDB")
  }, [])
  
  console.log('db.current outside', db.current) // happens too soon

  return (
    <div className="App">
      <h1>IndexedDB with React</h1>
      <Display db={db.current}></Display>
      <Form db={db.current}></Form>
    </div>
  )
}

export default App;
