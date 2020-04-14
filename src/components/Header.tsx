import React from 'react'

const Header = () => {

  // link to GitHub

  const share = () => {
    // https://stackoverflow.com/questions/47831741/property-share-does-not-exist-on-type-navigator
    let navigator: any  // const navigator: any = window.navigator throws error
    navigator = window.navigator

    if (navigator.share) {
      console.log('yessir')
      navigator.share({
        title: 'IDB Notes',
        text: 'Check out this practise project with you phone :)',
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
      <h1>Notes </h1><h3>- React PWA with IDB</h3>
    </div>
  )
}

export default Header