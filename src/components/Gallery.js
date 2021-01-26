import React, {useState, useEffect} from 'react'
import '../App.css'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from "react-router-dom"

export default function Gallery ( ) {
    const [albums, setAlbums] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [postNumber] = useState(16)
    const maxPages = Math.ceil(albums.length / postNumber)
    const [albumsTotal, setAlbumsTotal] = useState()

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
        setAlbumsTotal(json.length)
      });
    }, [])

    return (
      <div className="galleryWrapper">
        <h1>All Image Albums</h1>
        <p className="black-text" style={{ textAlign: 'center' }}>{albumsTotal} albums in total</p>
        <div className="cardWrapper">
          {paginatedAlbums.map((album)=>(
            <div key={album.id} className="imageCard">
              <h3 style={{ textAlign: 'center'}}><Link to={`/album/${album.id}`}>{album.title}</Link></h3>
            </div>
          ))}
        </div>
        <div className="pagination">
          <p className="white-text">Page {pageNumber} / {maxPages}</p>
          <div>
            <button className="btn" onClick={handlePrev} disabled={pageNumber === 1}>prev</button>
            <button className="btn" onClick={handleNext} disabled={pageNumber === maxPages}>next</button>
          </div>
        </div>
      </div>
    );
}