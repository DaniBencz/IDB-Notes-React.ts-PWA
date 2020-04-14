import React from 'react'

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
      <button id="share" onClick={share}>Share</button>
      <h1>Notes </h1>{/* <h3>- React PWA with IDB</h3> */}
      <button id="gitHub">
        <a href="https://github.com/DaniBencz/React.ts-IDB-Notes-PWA" rel="noopener noreferrer" target="_blank">
          GitHub
        </a>
      </button>
    </div>
  )
}

export default Header