import React, { useState, useRef, useEffect } from 'react'

const Form = (props: any) => {
  const [title, setTitle] = useState('')
  const [descript, setDescript] = useState('')
  const { addNewNote, installButton, installPWA } = props
  let titleDOM: any = useRef()  //  input#title DOM element

  useEffect(() => {
    titleDOM.current = document.getElementById('title')
    console.log('rendering')
  }, [])

  const clearFieldAndSubmit = () => {
    if (!title || title === 'Please provide title!') {
      setTitle('Please provide title!')
      titleDOM.current.style.color = 'red'
    } else {
      addNewNote(title, descript)
      setTitle('')  // empty input fields
      setDescript('')
    }
  }

  const writeTitle = (e: any) => {
    titleDOM.current.style.color = 'black'
    setTitle(e.target.value)
  }

  return (
    <div id="form">
      <h2>New Note</h2>
      <label> {/* Accessibility optimasition would require a string here*/}
        <input id="title" type="text" placeholder="Note Title" value={title}
          /* works with onInput too, but throws error in console */
          onChange={writeTitle}></input>
      </label>
      <label>
        <input id="description" type="text" placeholder="Description" value={descript}
          onChange={(e: any) => setDescript(e.target.value)}></input>
      </label>
      <button id="create" onClick={clearFieldAndSubmit}>Create New Note</button>
      {/* '&&' for inline conditional rendering */}
      {installButton === true && <button id="install" onClick={installPWA}>Install Application</button>}
    </div>
  )
}

export default Form