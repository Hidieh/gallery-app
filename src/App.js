import React, {useState, useEffect} from 'react'
import './App.css'
import Album from './components/Album'
import Gallery from './components/Gallery'

function App() {
  const [albumId, setAlbumId] = useState(1);
  return (
    <>
    <Gallery id={albumId} />
    </>
  )
}

export default App;