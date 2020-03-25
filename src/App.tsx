import React from 'react';
import './App.css';

// start interact with IDB
let dbs;
if ("indexedDB" in window && window.indexedDB !== undefined) {
  dbs = window.indexedDB
  console.log('starting')
}
else {
  alert("No support for indexedDB")
}


const Note = () => {
  return (
    <div id="note">
      <ul>
        <li>
          <h3>my note title</h3>
          <p>my note body</p>
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
      <Note></Note>
    </div>
  )
}

const Form = () => {
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
