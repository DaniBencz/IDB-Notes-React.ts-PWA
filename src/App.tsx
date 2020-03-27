// https://visualstudiomagazine.com/articles/2016/08/30/storing-data-client-javascript-typescript.aspx
// https://visualstudiomagazine.com/articles/2016/09/01/working-with-indexeddb.aspx

import React from 'react';
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

const Display = () => {
  return (
    <div id="display">
      <h2>Notes</h2>
      <Note title="my title" description="description"></Note>
      <Note title="foo" description="bar"></Note>
    </div >
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
