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
      alert('Sharing is not supported')
    }
  }

  return (
    <div id="header">
      {/* <button id="share" onClick={share}>Share</button> */}
      <img id="share" onClick={share} alt="" src={img} width="35" height="35" />
      <h1>Notes </h1>{/* <h3>- React PWA with IDB</h3> */}
      <a id="gitHub" href="https://github.com/DaniBencz/React.ts-IDB-Notes-PWA" rel="noopener noreferrer" target="_blank">
        <img alt="" src={github} width="33" height="33"></img>
      </a>
    </div>
  )
}

export default Header