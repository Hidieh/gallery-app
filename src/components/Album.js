import React, {useState, useEffect} from 'react'
import '../App.css'

export function GetAlbumInfo () {
  const [album, setAlbum] = useState([])
  fetch(`https://jsonplaceholder.typicode.com/albums/1`)
    .then((response) => response.json())
    .then((json) => {
      setAlbum(json)
    });
  return (
    <>
      {album.title}
    </>
  )
}

export default function Album ( id ) {
    const [images, setImages] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [postNumber] = useState(15)

    const currentPageNumber = (pageNumber * postNumber) - postNumber  
    const paginatedImages = images.splice(currentPageNumber, postNumber)

    const handlePrev = () => {
      if(pageNumber === 1) return
      setPageNumber(pageNumber - 1)
    }

    const handleNext = () => {
      setPageNumber(pageNumber + 1)
    }

    useEffect (() => {
      fetch(`https://jsonplaceholder.typicode.com/photos?_limit=50&?_album=${id}`)
      .then((response) => response.json())
      .then((json) => {
        setImages(json)
      });
    })

    return (
      <div className="galleryWrapper">
        <button className="btn">Back to album listing</button>
        <h1>Image Album</h1>
        <h2 style={{ marginTop: 0}}>Title: <GetAlbumInfo /></h2>
        <div className="cardWrapper">
          {paginatedImages.map((image)=>(
            <div key={image.id} className="imageCard">
              <div className="imageCardBg" style={{ backgroundImage: `url(${image.url})`}}></div>
              <h3>{image.title}</h3>
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