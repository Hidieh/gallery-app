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

    const currentPageNumber = (pageNumber * postNumber) - postNumber  
    const paginatedAlbums =  albums.splice(currentPageNumber, postNumber)

    const handlePrev = () => {
      if(pageNumber === 1) return
      setPageNumber(pageNumber - 1)
    }

    const handleNext = () => {
      setPageNumber(pageNumber + 1)
    }

    useEffect (() => {
      fetch(`https://jsonplaceholder.typicode.com/albums/`)
      .then((response) => response.json())
      .then((json) => {
        setAlbums(json)
      });
    })

    console.log(albums.length)

    return (
      <div className="galleryWrapper">
        <h1>All Image Albums</h1>
        <div className="cardWrapper">
          {paginatedAlbums.map((album)=>(
            <div key={album.id} className="imageCard">
              <h3><Link to={`/album/${album.id}`}>{album.title}</Link></h3>
              <h3>Owner: {album.userId}</h3>
            </div>
          ))}
        </div>
        <div>Page {pageNumber} </div>
        <div>
          <button onClick={handlePrev}>prev</button>
          <button onClick={handleNext}>next</button>
        </div>
      </div>
    );
}