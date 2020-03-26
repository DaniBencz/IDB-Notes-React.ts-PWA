// https://visualstudiomagazine.com/articles/2016/08/30/storing-data-client-javascript-typescript.aspx
// https://visualstudiomagazine.com/articles/2016/09/01/working-with-indexeddb.aspx

import React, { useEffect } from 'react';
import './App.css';

const Note = (props: any) => {
  return (
    <div id="note">
      <ul>
        <li>
          <h3>{props.title}</h3>
          <p>{props.body}</p>
          <button>Delete note</button>
        </li>
      </ul>
    </div>
  )
}

const Display = () => {
  return (
    <div id="display">
      <h2>Notes</h2>
      <Note title="my title" body="description"></Note>
    </div >
  )
}

const Form = () => {

  useEffect(() => {
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
        objectStore.createIndex('body', 'body', { unique: false })
      }

      request.onerror = function (e: any) {
        console.log('error: ', request.error)
      }
    }
    else {
      alert("No support for indexedDB")
    }
  }, [])

  return (
    <>
      <h2>New Note</h2>
      <input id="title" type="text"></input>
      <input id="body" type="text"></input>
      <button>Create new note</button>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <h1>IndexedDB with React</h1>
      <Display></Display>
      <Form></Form>
    </div>
  )
}

export default App;
