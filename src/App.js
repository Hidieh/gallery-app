import React, {useState, useEffect} from 'react'
import './App.css'
import Gallery from './components/Gallery'
import Album from './components/Album'
import Image from './components/Image'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from "react-router-dom"

function App() {
  const [albumId, setAlbumId] = useState(1);
  return (
    <Router>
      <div>
        <div>
          {/*<Link to="/">home</Link>*/}
        </div>

        <Switch>
          <Route path="/album/:id">
            <Album />
          </Route>
          <Route path="/image/:id">
            <Image />
          </Route>
          <Route path="/">
            <Gallery />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;