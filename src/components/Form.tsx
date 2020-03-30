import React, { useState } from 'react'

const Form = (props: any) => {
  const [title, setTitle] = useState('')
  const [descript, setDescript] = useState('')
  const { db } = props
  console.log('db: ', db)

  const addNewNote = () => {
    const transaction = db.transaction('notes_os', 'readwrite')
    const objectStore = transaction.objectStore('notes_os')
    const add = objectStore.add({ title: title, description: descript })  // update with state values

    add.onsuccess = () => console.log('success adding')

    setTitle('')  // empty input fields
    setDescript('')
  }

  return (
    <>
      <h2>New Note</h2>
      <input id="title" type="text" placeholder="Note Title" value={title} onChange={(e: any) => setTitle(e.target.value)}></input>
      {/* works with onInput too, but throws error in console */}
      <input id="description" type="text" placeholder="Description" value={descript} onChange={(e: any) => setDescript(e.target.value)}></input>
      <button onClick={addNewNote}>Create New Note</button>
    </>
  )
}

export default Form