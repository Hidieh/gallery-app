import React, {useState, useEffect} from 'react'
import '../App.css'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from "react-router-dom"

export default function Gallery ( ) {
    const [albums, setAlbums] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [postNumber] = useState(15)
    const maxPages = Math.ceil(albums.length / 15)

    const currentPageNumber = (pageNumber * postNumber) - postNumber  
    const paginatedAlbums =  albums.splice(currentPageNumber, postNumber)

    const handlePrev = () => {
      if(pageNumber === 1) return
      setPageNumber(pageNumber - 1)
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }

    const handleNext = () => {
      setPageNumber(pageNumber + 1)
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }

    useEffect (() => {
      fetch(`https://jsonplaceholder.typicode.com/albums/`)
      .then((response) => response.json())
      .then((json) => {
        setAlbums(json)
      });
    })

    return (
      <div className="galleryWrapper">
        <h1>All Image Albums</h1>
        <p style={{ textAlign: 'center' }}>{albums.length} albums in total</p>
        <div className="cardWrapper">
          {paginatedAlbums.map((album)=>(
            <div key={album.id} className="imageCard">
              <h3 style={{ textAlign: 'center'}}><Link to={`/album/${album.id}`}>{album.title}</Link></h3>
              {/*<p>Owner: {album.userId}</p>*/}
            </div>
          ))}
        </div>
        <div className="pagination">
          Page {pageNumber} / {maxPages}
          <div>
            <button className="btn" onClick={handlePrev} disabled={pageNumber === 1}>prev</button>
            <button className="btn" onClick={handleNext} disabled={pageNumber === maxPages}>next</button>
          </div>
        </div>
      </div>
    );
}