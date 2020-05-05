import React from 'react'
import img from './share-100.png'
import github from './github.png'

const Header = () => {

  // link to GitHub

  const share = () => {
    // https://stackoverflow.com/questions/47831741/property-share-does-not-exist-on-type-navigator
    let navigator: any  // const navigator: any = window.navigator throws error
    navigator = window.navigator

    if (navigator.share) {
      navigator.share({
        title: 'IDB Notes',
        text: 'IDB Notes React PWA',
        url: 'https://idbnotes.imfast.io/',
      })
        .then(() => alert('Sharing successfull'))
        .catch((error: any) => console.log('Error sharing', error));
    } else {
      alert('Sharing is supported only on mobile devices')
    }
  }

  return (
    <div id="header">
      <img id="share" onClick={share} alt="share" src={img} width="30" height="30" />
      <h1>IDB Notes</h1>
      <a id="gitHub" href="https://github.com/DaniBencz/React.ts-IDB-Notes-PWA" rel="noopener noreferrer" target="_blank">
        <img alt="gitHub repo" src={github} width="33" height="33"></img>
      </a>
    </div>
  )
}

export default Header