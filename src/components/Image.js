import React, {useState, useEffect} from 'react'
import '../App.css'
import { Link, useParams } from "react-router-dom"

export function GetAlbumInfo ( id ) {
  const [album, setAlbum] = useState([])
  fetch(`https://jsonplaceholder.typicode.com/albums/${id.id}`)
    .then((response) => response.json())
    .then((json) => {
      setAlbum(json)
    });
  return (<>{album.title}</> )
}

export default function Image ( ) {
    const id = useParams().id
    const [image, setImage] = useState([])

    useEffect (() => {
      fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setImage(json)
      });
    })

    return (
      <div className="galleryWrapper">
        <Link to={'/'}>
          <button className="btn">Back to album</button>
        </Link>
        <h1>Image</h1>
        <h2 style={{ marginTop: 0}}>Title: <GetAlbumInfo id={image.albumId} /></h2>
        <div className="cardWrapper">
          
            <div key={image.id} className="imageCard">
              <div className="imageCardBg" style={{ backgroundImage: `url(${image.url})`}}></div>
              <h3>{image.title}</h3>
            </div>
          
        </div>
      </div>
    );
}