import React, {useState, useEffect} from 'react'
import '../App.css'
import { Link, useParams } from "react-router-dom"

export default function Album ( ) {
    const id = useParams().id
    const [images, setImages] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [postNumber] = useState(16)
    const [maxPages, setMaxPages] = useState(0)
    const [imagesTotal, setImagesTotal] = useState(0)

    const currentPageNumber = (pageNumber * postNumber) - postNumber  
    const paginatedImages = images.splice(currentPageNumber, postNumber)

    const handlePrev = () => {
      setPageNumber(pageNumber - 1)
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }

    const handleNext = () => {
      setPageNumber(pageNumber + 1)
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }

    useEffect (() => {
      fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
      .then((response) => response.json())
      .then((json) => {
        setImages(json)
        setImagesTotal(json.length)
        setMaxPages(Math.ceil(json.length/postNumber))
      });
    }, [])

    return (
      <div className="galleryWrapper">
        <Link to={'/'}>
          <button className="btn">Back to album listing</button>
        </Link>
        <h1>Image Album</h1>
        <h2 style={{ marginTop: 0, textAlign: 'center' }}>Title: </h2>
        <p className="black-text" style={{ textAlign: 'center' }}>{imagesTotal} images in total</p>
        <div className="cardWrapper">
          {paginatedImages.map((image)=>(
            <div key={image.id} className="imageCard">
              <div className="imageCardBg" style={{ backgroundImage: `url(${image.thumbnailUrl})`}}></div>
              <Link to={`/image/${image.id}`}><h3>{image.title}</h3></Link>
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